const SHEET_NAME = 'Prodotti';
const SPREADSHEET_ID = 'PASTE_YOUR_SHEET_ID_HERE';

function doGet(e) {
  const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME);
  const data = sheet.getDataRange().getValues();
  const headers = data.shift();
  const products = data.map(row => {
    let obj = {};
    headers.forEach((h, i) => obj[h.toLowerCase()] = row[i]);
    return obj;
  });

  return ContentService.createTextOutput(JSON.stringify(products))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME);
  const params = JSON.parse(e.postData.contents);

  sheet.appendRow([
    params.name,
    params.price,
    params.material,
    params.image
  ]);

  return ContentService.createTextOutput("OK");
}
