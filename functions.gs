


// inserisce i dati inerenti ai Files affidi da importare in un oggetto 
function importFilesToDB(sheet){
  
  var objFilesAffidi = ObjApp.rangeToObjectsNoCamel(sheet.getDataRange().getValues())
  
  return objFilesAffidi
}

function importDataToSheet(data,sheet){
 
  // IMPORTA
  
  //elimina la prima e la seconda riga dell'array 2d che era vuota
  data.splice(0, 2); 
  
  //legge l'ultimo protocollo assegnato
  var lastRow = sheet.getLastRow()
  var lastProt = sheet.getRange(lastRow,1).getValue()
  Logger.log(lastProt)
  
  //protocolla i nuovi dati
  for (var i=0; i<data.length; i++){
    data[i].unshift(lastProt+i+1)
  }
  
  //importa i dati nel foglio
  sheet.getRange(lastRow+1,1,data.length, (data[0].length)).setValues(data)
  
}

// legge uno sheet e inserisce i dati in un oggetto
function grabObjectFromSheet(sheet){
  
  var data = sheet.getDataRange().getValues()
  
  var headers = data[0]
  
  //elimina la prima e la seconda riga dell'array 2d che è vuota
  // in quanto negli sheets originali gli header sono composti da 2 righe
  data.splice(0,2);
  data.unshift(headers)
  
  var obj = ObjApp.rangeToObjects(data)
  return obj   
}
  
function createFilesInFolder(docName) {
  //crea il documento
  var doc = DocumentApp.create(docName)
  //apre il documento come file
  var docFile = DriveApp.getFileById( doc.getId() );
  //salva il file nella cartella
  DriveApp.getFolderById(IDFolder).addFile( docFile );
  //rimuove il file originario dalla root
  DriveApp.getRootFolder().removeFile(docFile);
}


function cloneDoc(fileDoc, copyTitle) {;
 var newFileDoc = fileDoc.makeCopy(copyTitle);
 Logger.log(fileDoc.getUrl())
 return newFileDoc
} 

function mergeDataToHtml(newDoc, objData){
  for (var record in objData){
    Logger.log(record)
    var text = 'name ' + objData.name + ' cognome' + objData.cognome
    newDoc.appendPageBreak()
  }
}

/**
* @param  {objData} Oggetto che contiene i dati da sostituire nei rispettivi campi es. 'Nome': 'Daniele'
 */
function replaceTextWithObject(fileDoc, objData){

  // itera su objData e per ogni oggetto interno richiama la funzione di sostituzione del testo
var i=1
  for (var record in objData){
    Logger.log(record)
    //crea un oggetto con i dati da unire al documento
    var objRecord = objData[record]
    // unisce i dati al documento
    Logger.log(objRecord)
    Logger.log("replace")
    var separator = '%'
     for (var key in objRecord){
       fileDoc.replaceText(separator + key + separator,objRecord[key])
       Logger.log(objRecord[key]) 
       // crea interruzione di pagina 
       fileDoc.appendPageBreak()
     }
     Logger.log(i)
     i++
  }
  
// chiude il ciclo
  
    var nameDoc = 'lotto'
    changeNameDoc(fileDoc, nameDoc)
}

/**
* @param  {doc} Oggetto Document di cui si vuole cambiare il nome
* @name nome da sostituire
 */
function changeNameDoc(doc, name){
 
  doc.setName(name)

}

function getHeight(length, ratio) {
  var height = ((length)/(Math.sqrt((Math.pow(ratio, 2)+1))));
  return Math.round(height);
}

function getWidth(length, ratio) {
  var width = ((length)/(Math.sqrt((1)/(Math.pow(ratio, 2)+1))));
  return Math.round(width);
}

 function comma(num){
    while (/(\d+)(\d{3})/.test(num.toString())){
        num = num.toString().replace(/(\d+)(\d{3})/, '$1'+'.'+'$2');
    }
    return num;
}



// aggiorna lo stato del file a "Affido importato" e scrive la data di importazione

function updateFileState(value){
Logger.log('updateFileState')
var sheet = sheetFilesAffidi
Logger.log(sheetFilesAffidi.getName())
var lastRow = sheet.getLastRow()
  var data = sheet.getDataRange().getValues();
  for (var i = 1; i < data.length; i++) {
      Logger.log(i + ' ' + data[i][4])
      if (data[i][3] == value) { 
        sheet.getRange(i+1, 5).setValue('Importato')
        sheet.getRange(i+1, 7).setValue(new Date());
        return
      }
  }
}

function deleteData(){
  var sheet, lastCol 
  var sheets = [sheetFilesAffidi, sheetDiffideDaInviare,sheetDiffideInviate, sheetDettaglioFatture]

  for (i=0; i<sheets.length; i++){
    sheet = sheets[i]
    lastCol = sheet.getLastColumn()
    var data = sheet.getDataRange().getValues()
    Logger.log(sheet.getName() +" " + data.length)
    if (data.length >1){
      sheet.getRange(2, 1,(data.length-1),lastCol).clear()
    }
  }
}

