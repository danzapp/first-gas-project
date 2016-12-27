function mappaturaVecchioNuovo() {
  mappaDettaglioCasi()
  mappaDettaglioCasiNoFatture()
  mappaVisuraCamerale()  
}

function readFilesAffidiFromFolder(){

  // legge il folder Files Affidi da Importare e scrive il contenuto nel foglio Files Affidi
  writeFilesToSheet()
  var objFilesAffidi = ObjApp.rangeToObjectsNoCamel(sheetFilesAffidi.getDataRange().getValues())
  Logger.log(JSON.stringify(objFilesAffidi))
  return JSON.stringify(objFilesAffidi)
}


function readDiffideDaInviareFromFiles(arrayFilesAffidi){
  //legge i dati dei files Affidi da Importare 
  //var objFilesAffidi = ObjApp.rangeToObjectsNoCamel(sheetFilesAffidi.getDataRange().getValues())
  var url 
  //importa per ogni files i dati degli affidi su DB
  Logger.log('Numero Files di Affido da importare;  ' + arrayFilesAffidi.length )
  for (j=0; j<arrayFilesAffidi.length; j++){
    url = arrayFilesAffidi[j]
    var ssAffido = SpreadsheetApp.openByUrl(url)
    var objDiffideDaInviare = readAffido(ssAffido)
    updateFileState(url)
    writeAffidi(objDiffideDaInviare)
  }
  Logger.log('objDiffideDaInviare')
  Logger.log(objDiffideDaInviare)
    return JSON.stringify(objDiffideDaInviare)
  
}


function readDiffideDaInviareFromSheet(){
    
    var objAllDiffideDaInviare = ObjApp.rangeToObjectsNoCamel(sheetDiffideDaInviare.getDataRange().getValues())
    return JSON.stringify(objAllDiffideDaInviare)
}

