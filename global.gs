//FOLDERS

var affidiDaImportareFolderId = '0BznBNzYR5OHDT2hiZ01IRFpYbG8'
var affidiDaImportareFolder = DriveApp.getFolderById(affidiDaImportareFolderId)

// Spreadsheet
var urlDB = 'https://docs.google.com/spreadsheets/d/1vcfSULfxMDQkbQC8WI8m-EKAuD2OvL-s92G6Nv9aG_c/edit'
var ssDB = SpreadsheetApp.openByUrl(urlDB)
var sheetImpostazioni = ssDB.getSheetByName('Impostazioni')
var sheetFilesAffidi = ssDB.getSheetByName('Files affidi')
var sheetDiffideDaInviare = ssDB.getSheetByName('Diffide da inviare')
var sheetDiffideInviate = ssDB.getSheetByName('Diffide inviate')
var sheetDettaglioFatture = ssDB.getSheetByName('Dettaglio fatture')


// variabili per la conversione tra vecchio e nuovo file

var urlOld = 'https://docs.google.com/spreadsheets/d/1rCTlWGMou84Gs3P4SOpbC_09lTJ6_5hH5h8pHJAFuMg/edit'
var ssOld = SpreadsheetApp.openByUrl(urlOld)
var sheetOldDettaglioCasi = ssOld.getSheetByName('DETTAGLIO CASI')
var sheetOldDettaglioCasiNoFatture = ssOld.getSheetByName('DETTAGLIO CASI NO FATTURE')
var sheetOldVisuraCamerale = ssOld.getSheetByName('VISURA CAMERALE CUSTOMER')

var urlNew = 'https://docs.google.com/spreadsheets/d/1Kn-bYfkPGR-VzWODC9gb-wiNH6BAhUPwxJ577dULrew/edit'
var ssNew = SpreadsheetApp.openByUrl(urlNew)
var sheetNewDettaglioCasi = ssNew.getSheetByName('CASI FATTURE')
var sheetNewDettaglioCasiNoFatture = ssNew.getSheetByName('CASI NO FATTURE')
var sheetNewVisuraCamerale = ssNew.getSheetByName('VISURA CAMERALE CUSTOMER')

// STAMPA DIFFIDE
IDTemplate = '1o6VxkKr5UamKmq1Jw48YBAgpaaGOWodFkmMeIhxf1pQ'
IDSpreadsheet = '1BxFC7Cys1JWxYy9CjaW0tslARC9uMLFGzcYjrytur8M' 
IDFolder = '0BznBNzYR5OHDVmRkX0VmdDZlelk'
ssID = '1vcfSULfxMDQkbQC8WI8m-EKAuD2OvL-s92G6Nv9aG_c'




