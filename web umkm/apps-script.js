// File ini untuk di-paste ke Google Apps Script Editor
// Extensions → Apps Script di Google Sheets

function doGet(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Menu');
    
    if (!sheet) {
      return ContentService.createTextOutput(JSON.stringify({
        error: 'Sheet "Menu" tidak ditemukan'
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    // Ambil semua data dari sheet
    const data = sheet.getDataRange().getValues();
    
    // Baris pertama adalah header, skip
    const headers = data[0];
    const menuItems = [];
    
    // Parse data mulai dari baris kedua
    for (let i = 1; i < data.length; i++) {
      const row = data[i];
      
      // Skip baris kosong
      if (!row[0]) continue;
      
      menuItems.push({
        name: row[0] || '',
        description: row[1] || '',
        price: row[2] || 0,
        image: row[3] || '',
        isAvailable: row[4] || 'Ya'
      });
    }
    
    // Return data sebagai JSON
    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      data: menuItems
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// Fungsi untuk testing (opsional)
function testGetData() {
  const result = doGet();
  Logger.log(result.getContent());
}
