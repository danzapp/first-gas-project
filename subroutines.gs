// crea elenco Files Affidi da Importare sullo sheet
// e restituisce numero files presenti nella folder 
// e numero files nuovi scritti sullo sheet

function writeFilesToSheet() {
    Logger.log('writeFilesToSheet')
    
    var files = affidiDaImportareFolder.getFiles()
    var file, data, sheet = sheetFilesAffidi;
    var alreadyOnSheet = false
    var wroteOnSheet = false
    var onFolder = 0
    var lastRow = sheet.getLastRow()
    
    //itera lungo i file trovati sulla folder
    while (files.hasNext()) {
            file = files.next();
            onFolder++
            alreadyOnSheet = false
             // imposta il valore di una nuova riga dello sheet
            //con i dati del file sulla folder
            data = [ 
              file.getName(),
              file.getDateCreated(),
              file.getSize(),
              file.getUrl(),
              "Assegnato", //Stato
              new Date(), //Data assegnazione 
            ];
            
            // se non ci sono file già scritti sullo sheet salta al prossimo file suòòa folder
            if (lastRow>1){
                  //verifica se il file presente sulla folder è già presente sullo sheet
                  for (var row=2; row<=lastRow; row++){    
                        // se il file della folder è gia sullo sheet pulisci colonna Badge
                        // se no salta oltre
                        if (data[3] == sheet.getRange(row,4).getValue()){
                            // memorizza che il file era già sullo sheet
                            alreadyOnSheet = true
                            Logger.log(alreadyOnSheet + ' file già presente su sheet')
                            // pulisce eventuale 'new' su Badge
                            sheet.getRange(row,8).setValue('')
                        }
                  }
             }
              if(!alreadyOnSheet){
                  // scrive il file sullo sheet
                  data.push("","(new)") // Badge
                  Logger.log('data ' + data)
                  sheet.appendRow(data);
                  wroteOnSheet++ 
              }          
     }
        //torna su flow (readFilesAffidiFromFolder) 
}
 
function readAffido(ss){
Logger.log('readyAffido')

// Legge e mette in relazione i 3 fogli del file affido
// Verifica se esistono duplicati (codice cliente e fatture) su Diffide inviate (????)

 var sheet = ss.getSheetByName('CASI NO FATTURE')
 var objCasiNoFatture = grabObjectFromSheet(sheet)
 //Logger.log('objCasiNoFatture')
 //Logger.log(objCasiNoFatture)
 var sheet = ss.getSheetByName('CASI FATTURE')
 var objCasiFatture = grabObjectFromSheet(sheet)
 //var objCasiFatture = sheet.getDataRange().getValues()
 //objCasiFatture.shift()
 //objCasiFatture.shift()
 

 var sheet = ss.getSheetByName('VISURA CAMERALE CUSTOMER')
 var objVisureCamerali = grabObjectFromSheet(sheet)

 //legge l'ultimo protocollo
 var lastRowPratica = sheetDiffideDaInviare.getLastRow()
 Logger.log('lastRowPratica = ' + lastRowPratica)
 if (lastRowPratica == 1){
   var newProt = 0;
 }
 else
 {
   var newProt = sheetDiffideDaInviare.getRange(lastRowPratica,1).getValue()
 }

 var lastCol = sheetDiffideDaInviare.getLastColumn()
 Logger.log("Colonne di Diffide da Inviare " + lastCol)
 
 var headers = sheetDiffideDaInviare.getRange(1,1,2,lastCol).getValues()
 Logger.log('new prot  = ' + newProt)
 
 //crea array di oggetti  objDiffideDaInviare
 
 // inizia con Casi NO Fatture
 var objDiffideDaInviare = []
 //crea oggetti interni
 for (var i=0; i<objCasiNoFatture.length; i++){
 Logger.log('i = ' + i)
   //incrementa protocollo
   newProt++
   //crea oggetto relativo a pratica protocollata
   objDiffideDaInviare[i]={
     'Riferimento pratica': newProt,
     'Codice cliente': objCasiNoFatture[i].codcliente,
     'Dato fiscale': objCasiNoFatture[i].datoFiscale,
     'Ragione sociale': objCasiNoFatture[i].ragioneSociale,
     'Indirizzo': objCasiNoFatture[i].indirizzoResidenza,
     'CAP': objCasiNoFatture[i].capResidenza,
     'Comune' : objCasiNoFatture[i].comuneResidenza,
     'Provincia': objCasiNoFatture[i].provinciaResidenza,
     'Telefono':objCasiNoFatture[i].telefono,
     'Provenienza indirizzo': 'CACS'
   }
     // cerca info camerali di Casi No Fatture    
     // ATTENZIONE il match è effettuato con il dato fiscale perchè il codice cliente su Visure Camerali non corrisponde
     for (var j in objVisureCamerali){
         if (objCasiNoFatture[i].datoFiscale === objVisureCamerali[j].partitaIva){ 
           objDiffideDaInviare[i]['Indirizzo'] = objVisureCamerali[j].indirizzo
           objDiffideDaInviare[i]['CAP'] = objVisureCamerali[j].cap
           objDiffideDaInviare[i]['Comune'] = objVisureCamerali[j].comune
           objDiffideDaInviare[i]['Provincia'] = objVisureCamerali[j].provincia
           objDiffideDaInviare[i]['Telefono'] = objCasiNoFatture[i].telefono
           objDiffideDaInviare[i]['Provenienza indirizzo'] = 'Info camerali'    
         }
    }
    // inizializza variabili relative a fatture
    var progressivoFattura = 0
    var importoTotale = 0
    //crea array interno per la proprietà fatture
    var fatture = []
    Logger.log('rif pratica = ' + objDiffideDaInviare[i]['Riferimento pratica'])
    // filtra i objCasiFatture in base a codice cliente
    for (var z=0; z<objCasiFatture.length; z++){
    
    // inizializza il progressivo fattura
    
      if (objCasiFatture[z].codcliente === objCasiNoFatture[i].codcliente){
          progressivoFattura++
          // compene l'array con le fatture, inserisce anche il numero progressivo di fattura (z)
          fatture.push([newProt,objCasiFatture[z].codcliente,progressivoFattura,objCasiFatture[z].numeroFattura,objCasiFatture[z].dataFattura,objCasiFatture[z].importoScoperto]) 
          importoTotale += objCasiFatture[z].importoScoperto
        }
     }
     
     objDiffideDaInviare[i]['Fatture presenti'] = progressivoFattura
     objDiffideDaInviare[i]['Importo totale'] = importoTotale
     objDiffideDaInviare[i]['fatture'] = fatture
 }
Logger.log(objDiffideDaInviare)
return objDiffideDaInviare

}

function writeAffidi(objDiffideDaInviare){ 
  Logger.log('writeAffidi')
  // scrive gli affidi sul foglio Diffide Da Inviare
  var lastCol = sheetDiffideDaInviare.getLastColumn();
  var headers = sheetDiffideDaInviare.getRange(1,1,1,lastCol).getValues();
  Logger.log('headers ' + headers)
  var rowDiffide = sheetDiffideDaInviare.getLastRow()
  
  for (var x=0; x<objDiffideDaInviare.length; x++){
    rowDiffide ++
    var rowFatture = sheetDettaglioFatture.getLastRow()
    Logger.log('x = ' + x)
      // scrive i dati sul foglio Diffide da inviare 
      for (var prop in objDiffideDaInviare[x]){
          Logger.log(prop)
          // scrive le fatture in formato stringa in una colonna del foglio Diffide da Inviare
          if (prop == 'fatture'){
            
            var fattureString = JSON.stringify(objDiffideDaInviare[x][prop])
            Logger.log(objDiffideDaInviare[x][prop])
            var index = headers[0].indexOf('Fatture')
            sheetDiffideDaInviare.getRange(rowDiffide,index+1).setValue(fattureString)
          }
          // scrive su tutte le colonne del foglio Diffide da inviare tranne l'ultima  
          var index = headers[0].indexOf(prop)
          if (index >=0){
            sheetDiffideDaInviare.getRange(rowDiffide,index+1).setValue(objDiffideDaInviare[x][prop])
          }
      }
        sheetDiffideDaInviare.getRange(rowDiffide,lastCol).setValue(objDiffideDaInviare[x]['Data importazione'] = new Date())
        // per la proprietà 'fatture' scrive i dati delle fatture sul foglio Dettaglio fatture
          rowFatture++
          var fatture = objDiffideDaInviare[x]['fatture']
          sheetDettaglioFatture.getRange(rowFatture,1,fatture.length,6).setValues(fatture)
      }
 }

 
function checkDuplicati(field,sheet){

  var lastProt = sheet.getRange(lastRow, 9)
  
   var range = sheet.getRange(2, 3, 2, lastRow);
      var codclienteCol = range.getValues();
      var search = field
      for (var i=0; i < codclienteCol.length; i++) {
        if (codclienteCol[i][0] == search) {
          Logger.log("il codice cliente " + field + " risulta già presente")
          return true
        } 
      }
      Logger.log("non risultano duplicati")
      return false 
}