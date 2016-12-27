// legge l'ID dello script
function getThisScriptId() {
  return DriveApp.getFileById('1KXXFSzEvlF7Ge2BisW-nYlEY0m5dEH7F7OSeWQ9fNEuDNVTehmIr8iUs');
}

function readDataFilesAffidi(){
  //legge i dati dal foglio Filed Affidi
  var arrayFilesAffidi = sheetFilesAffidi.getDataRange().getValues()
  Logger.log(arrayFilesAffidi)
  return arrayFilesAffidi
}