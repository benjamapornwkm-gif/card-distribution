const SPREADSHEET_ID = 'PUT_SPREADSHEET_ID_HERE';
const DRIVE_FOLDER_ID = 'PUT_DRIVE_FOLDER_ID_HERE';

function doGet(e) {
  const action = (e && e.parameter && e.parameter.action) || 'health';
  if (action === 'health') return json_({ok:true, service:'card-distribution'});
  if (action === 'list') return json_({ok:true, rows:list_()});
  return json_({ok:false, error:'Unknown action'});
}

function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents || '{}');
    if (body.action === 'save') return json_({ok:true, id:save_(body.data || {})});
    if (body.action === 'uploadImage') return json_({ok:true, file:upload_(body)});
    return json_({ok:false,error:'Unknown action'});
  } catch(err) { return json_({ok:false,error:String(err)}); }
}

function getSheet_(name, headers) {
  const ss=SpreadsheetApp.openById(SPREADSHEET_ID);
  let sh=ss.getSheetByName(name);
  if(!sh){ sh=ss.insertSheet(name); sh.appendRow(headers); sh.setFrozenRows(1); }
  return sh;
}

function save_(d) {
  const lock=LockService.getScriptLock(); lock.waitLock(30000);
  try {
    const headers=['ID','Date','CenterCode','CenterName','Qty','Trip','Registration','SealLock','Status','ArrivalDate','ArrivalImageFileId','CreatedAt','UpdatedAt'];
    const sh=getSheet_('Distributions',headers), id=d.id||Utilities.getUuid(), now=new Date();
    sh.appendRow([id,d.date||'',d.code||'',d.center||'',Number(d.qty||0),d.trip||'',d.reg||'',d.seal||'',d.status||'รอจัดส่ง',d.arrivalDate||'',d.arrivalImageFileId||'',now,now]);
    return id;
  } finally { lock.releaseLock(); }
}

function list_() {
  const headers=['ID','Date','CenterCode','CenterName','Qty','Trip','Registration','SealLock','Status','ArrivalDate','ArrivalImageFileId','CreatedAt','UpdatedAt'];
  const sh=getSheet_('Distributions',headers), values=sh.getDataRange().getValues();
  if(values.length<2)return [];
  const h=values.shift();
  return values.map(r=>Object.fromEntries(h.map((k,i)=>[k,r[i]])));
}

function upload_(body) {
  const folder=DriveApp.getFolderById(DRIVE_FOLDER_ID);
  const bytes=Utilities.base64Decode(body.base64||'');
  const blob=Utilities.newBlob(bytes,body.mimeType||'image/jpeg',body.fileName||('proof_'+Date.now()+'.jpg'));
  const f=folder.createFile(blob);
  return {id:f.getId(),name:f.getName()};
}
function json_(o){return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);}
