# บันทึกการกระจายบัตร — GitHub Ready Starter

## เปิดใช้งาน Demo
เปิด `index.html` ได้ทันที ข้อมูล Demo ปัจจุบันยังเก็บใน `localStorage` ของ Browser เพื่อให้ทดสอบ UI/Workflow ได้โดยไม่ต้องตั้ง Cloud ก่อน

## โครงสร้างสำหรับใช้งานจริง
- GitHub Pages: Hosting หน้าเว็บ
- Google Apps Script: API
- Google Sheets: ข้อมูลกลาง
- Google Drive: รูปหลักฐาน

## ก่อนใช้งาน Production จริง
1. สร้าง Google Sheet และ Google Drive Folder
2. นำ `apps-script/Code.gs` ไปสร้าง Apps Script Project
3. ใส่ `SPREADSHEET_ID` และ `DRIVE_FOLDER_ID`
4. Deploy เป็น Web App ตามนโยบายบัญชี Google/องค์กร
5. ใส่ Web App URL ใน `config.js`
6. เปลี่ยน data layer ใน `index.html` จาก localStorage เป็น Apps Script API

> สำคัญ: ชุดนี้ “พร้อมขึ้น GitHub เพื่อพัฒนา/ทดสอบ UI” แต่ยังไม่ควรถือว่า Production Cloud พร้อมใช้ทันที จนกว่าจะเชื่อม API จริงและกำหนด Authentication/Authorization

## ฟังก์ชัน UI ที่รวมไว้
- Navy Blue + LINE Seed Sans TH
- Dashboard
- บันทึกหลายศูนย์ต่อรอบ
- จำนวนขั้นต่ำ 500 ใบ
- 1 Carton = 3 Box = 15 Pack = 1,500 ใบ
- เที่ยวรถ / ทะเบียน
- Seal Lock G05 + 4 หลัก และตรวจเลขซ้ำ
- ประวัติแบบคลิกแถวเพื่อดูรายละเอียด (ไม่มีปุ่มแก้ไข)
- Update สถานะ: รอจัดส่ง / อยู่ระหว่างขนส่ง / ถึงศูนย์แล้ว
- ถามว่ามีส่งคืนหรือไม่ และบันทึกจำนวน/สาเหตุ/รูป
- Master Data

## ข้อจำกัด Demo
รูปใน Demo ยังจำเพียงสถานะว่ามีรูป ไม่ได้ persist binary รูปจริงข้าม session; เวอร์ชัน Cloud ต้อง upload ไป Google Drive และเก็บ File ID ใน Google Sheets
