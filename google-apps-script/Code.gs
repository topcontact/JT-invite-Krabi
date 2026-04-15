/**
 * Google Apps Script สำหรับรับข้อมูล RSVP จากเว็บไซต์งานแต่ง
 * 
 * วิธีใช้งาน:
 * 1. เปิด Google Sheet ที่ใช้เก็บข้อมูล
 * 2. ไปที่เมนู "ส่วนขยาย" (Extensions) -> "Apps Script"
 * 3. ลบโค้ดเก่าทั้งหมด แล้ววางโค้ดนี้ทับ
 * 4. กด Save
 * 5. กด Deploy -> New Deployment -> Web app -> Anyone -> Deploy
 * 6. Copy URL ไปใส่ในไฟล์ .env ของโปรเจค (GOOGLE_SCRIPT_URL)
 * 
 * ⚠️ สำคัญ: แถวที่ 1 ของ Sheet ต้องมี Header ตรงกับชื่อด้านล่างนี้
 * (เรียงลำดับยังไงก็ได้ ระบบจะจับคู่ให้อัตโนมัติ):
 * 
 * Timestamp | inviteType | attending | name | phone | roomMate | adults |
 * childrenUnder7 | children7To12 | childrenOver12 | dietary |
 * waitGroupRate | firstName | lastName | rooms | roommateName |
 * Room (4k-6k THB) | Room (6k-10k THB) | Room (25k-40k THB) |
 * Check-in | Check-out | Night Stay | Message
 */

var SHEET_NAME = "Sheet1"; // ⚠️ เปลี่ยนชื่อนี้ให้ตรงกับชื่อแท็บ Sheet ของคุณ

/**
 * Alias map: หาก Header ใน Sheet ใช้ชื่อเก่า (programmatic)
 * ระบบจะแปลงให้ตรงกับ key ที่ frontend ส่งมาอัตโนมัติ
 * 
 * Key = ชื่อ Header เก่าใน Sheet
 * Value = ชื่อ key ที่ frontend ส่งมาจริง
 */
var HEADER_ALIASES = {
  "stayType": "roomMate",
  "roomRange4kTo6k": "Room (4k-6k THB)",
  "roomRange6kTo10k": "Room (6k-10k THB)",
  "roomRange25kTo40k": "Room (25k-40k THB)",
  "checkIn": "Check-in",
  "checkOut": "Check-out",
  "nightStay": "Night Stay",
  "message": "Message"
};

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
    if (!sheet) {
      sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    }

    // แปลงข้อมูลที่ส่งมาเป็น JSON
    var rawData = JSON.parse(e.postData.contents);

    // ดึง Header จากแถวที่ 1
    var rawHeaders = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    var headers = rawHeaders.map(function(h) { return String(h).trim(); });

    // สร้าง Array ข้อมูลให้ตรงกับลำดับ Header
    var rowData = [];
    for (var i = 0; i < headers.length; i++) {
      var headerName = headers[i];

      if (headerName === "Timestamp") {
        rowData.push(new Date());
      } else {
        // ลองหา key ตรงๆ ก่อน ถ้าไม่เจอให้ลอง alias
        var value = rawData[headerName];
        if (value === undefined || value === null) {
          var aliasKey = HEADER_ALIASES[headerName];
          if (aliasKey) {
            value = rawData[aliasKey];
          }
        }
        rowData.push(value !== undefined && value !== null ? value : "");
      }
    }

    // เขียนข้อมูลลงแถวถัดไป (ไม่ทับข้อมูลเดิม)
    sheet.appendRow(rowData);

    return ContentService.createTextOutput(
      JSON.stringify({ result: "success", data: rawData })
    ).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({ result: "error", error: error.toString() })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

function doOptions(e) {
  return ContentService.createTextOutput("")
    .setMimeType(ContentService.MimeType.TEXT);
}
