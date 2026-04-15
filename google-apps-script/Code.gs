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
  "Nickname": "name",
  "ชื่อเล่น": "name",
  "stayType": "roomMate",
  "DO YOU HAVE PLANS TO STAY WITH A ROOMMATE?": "DO YOU HAVE PLANS TO STAY WITH A ROOMMATE?",
  "Stay with Roommate?": "DO YOU HAVE PLANS TO STAY WITH A ROOMMATE?",
  "Stay with Roommate": "DO YOU HAVE PLANS TO STAY WITH A ROOMMATE?",
  "roomMate": "roomMate",
  "Roommate Name": "Roommate Name",
  "roommateName": "roommateName",
  "First Name (English)": "First Name (English)",
  "Last Name (English)": "Last Name (English)",
  "Number of Rooms Required": "Number of Rooms Required",
  "waitGroupRate": "Wait for Group Rate",
  "Special Group Rate": "Wait for Group Rate",
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
    
    // สร้าง Mapping แบบ normalize (ตัวเล็กหมด ไม่มีช่องว่าง) เพื่อลดความผิดพลาดจากคน
    var normalizedData = {};
    for (var k in rawData) {
      var normK = k.toString().toLowerCase().replace(/\s/g, "");
      normalizedData[normK] = rawData[k];
    }

    // ดึง Header จากแถวที่ 1
    var rawHeaders = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    
    // สร้าง Array ข้อมูลโดยไล่ตามลำดับ Header ใน Sheet
    var rowData = [];
    for (var i = 0; i < rawHeaders.length; i++) {
        var fullHeader = String(rawHeaders[i]).trim();
        var hNorm = fullHeader.toLowerCase().replace(/\s/g, "");

        if (hNorm === "timestamp") {
            rowData.push(new Date());
            continue;
        }

        // 1. ลองหาจาก JSON data โดยตรง (แบบ normalize)
        var value = normalizedData[hNorm];

        // 2. ถ้าไม่พบ ลองหาผ่าน Alias Map
        if (value === undefined || value === null || value === "") {
            for (var aliasSource in HEADER_ALIASES) {
                var sourceNorm = aliasSource.toLowerCase().replace(/[^a-z0-9]/g, "");
                if (sourceNorm === hNorm || aliasSource.toLowerCase().replace(/\s/g, "") === hNorm) {
                    var aliasTarget = HEADER_ALIASES[aliasSource].toLowerCase().replace(/\s/g, "");
                    value = normalizedData[aliasTarget];
                    if (value === undefined || value === null || value === "") {
                      // Try alphanumeric only normalization for target too
                      value = normalizedData[aliasSource.toLowerCase().replace(/[^a-z0-9]/g, "")];
                    }
                    if (value !== undefined && value !== null && value !== "") break;
                }
            }
        }

        // 3. ถ้ายังไม่พบจริงๆ ลองหาจาก Key เดิมๆ แบบเป๊ะๆ (กันพลาด)
        if (value === undefined || value === null || value === "") {
            value = rawData[fullHeader] || "";
        }

        rowData.push(value);
    }

    // เขียนข้อมูลลง Sheet
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
