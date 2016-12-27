function mappaDettaglioCasi() {

  var oldDettaglioCasi = sheetOldDettaglioCasi.getDataRange().getValues()
  var objOld = ObjApp.rangeToObjects(oldDettaglioCasi)
  var headersOld = ObjApp.camelArray(oldDettaglioCasi[0])
  Logger.log(headersOld)
  //Logger.log(JSON.stringify(objOld))
  var newDettaglioCasi = sheetNewDettaglioCasi.getDataRange().getValues()
  
  //var headersNew = ObjApp.camelArray(newDettaglioCasi[0])
  //Logger.log("new prop " + headersNew)
  
  newDettaglioCasi = newDettaglioCasi.slice(0); // make copy
  newDettaglioCasi.splice(1, 1); //elimina la seconda riga dell'array 2d che era vuota
  
  var objNew = ObjApp.rangeToObjects(newDettaglioCasi)
  
  //Logger.log("VECCHIO SISTEMA \n" + JSON.stringify(objOld))
  Logger.log("NUOVO SISTEMA \n" + JSON.stringify(objNew))
//object mapping
var mapped = []

  for (var row in objNew){
    Logger.log("OLD ")
    Logger.log(objNew[row])
    Logger.log("NEW ")
    Logger.log(objOld[row])
      objOld[row]= {
        'codiceCliente': objNew[row]['codcliente'],
        'codiceOpec': objNew[row]['opec'],
        'ragSocialeCogENom': objNew[row]['ragioneSociale'],
        'categoriaDiDiritto': objNew[row]['codCategoriaDiDiritto'],
        'categoriaDiDirittoDes': objNew[row]['categoriaDiDiritto'],
        'canale': objNew[row]['canale'],
        'dat': objNew[row]['dat'],
        'filiale': objNew[row]['filiale'],
        'areaElenco': objNew[row]['areaElenco'],
        'amCognomeNomeCod': 'A',
        'zmCognomeNomeCod': 'A',
        'agenteCognomeNomeCod': objNew[row]['agente'],
        'areaStato': objNew[row]['codStatoPraticaWf'],
        'areaStatoDes': objNew[row]['statoPraticaWf'],
        'dataIngressoInStato': objNew[row]['ingressoStatoPraticaWf'],
        'operatore': 'A',
        'operatoreDes': 'A', 
        'dataAffidamentoAOperatore': objNew[row]['dataAffidamento'],
        'giorniAging': objNew[row]['aging'],
        'areaFunzionale': 'MP',
        'areaFunzionaleDes': objNew[row]['avvocatoAffidatario'],
        'indirizzoDiResidenza': objNew[row]['indirizzoResidenza'],
        'comuneDiResidenza': objNew[row]['comuneResidenza'],
        'capDiResidenza': objNew[row]['capResidenza'],
        'provincia': objNew[row]['provinciaResidenza'],
        'nTelefonico': ""+objNew[row]['telefono']+"",
        'nrFattura': objNew[row]['numeroFattura'],
        'tipoRegistro':'A',
        'dataFattura':objNew[row]['dataFattura'],
        'numeroCommissione': '0',
        'importoScadutoEuro': objNew[row]['importoScaduto'],
        'importoAScadereEuro': objNew[row]['importoAScadere'],
        'importoScopertoEuro': objNew[row]['importoScoperto']
      }
    mapped.push(objOld[row])
    
  }
Logger.log("Mapped " + JSON.stringify(mapped))
//Logger.log(headersOld)
 var valuesArray = [];  
  var headers = headersOld;  
  for (var j=0; j < mapped.length; j++){
    var rowValues = [];
    for (var i=0; i < headers.length; i++){
      var header = headers[i]
      if (header==null){
        rowValues.push('')
      }
      rowValues.push(mapped[j][header]);
    } 
  valuesArray.push(rowValues);
  //Logger.log(valuesArray[j])
  }
  Logger.log(valuesArray)
  var lastRow = sheetOldDettaglioCasi.getLastRow()
  sheetOldDettaglioCasi.getRange(2,1,valuesArray.length, valuesArray[0].length).setValues(valuesArray)
 
} 
/*
DATO FISCALE,
COD.CLIENTE,
OPEC,
RAGIONE SOCIALE,
COD. CATEGORIA DI DIRITTO,
CATEGORIA DI DIRITTO,
CANALE,
DAT,
FILIALE,
AREA ELENCO,
AGENTE,
COD. STATO PRATICA WF,
STATO PRATICA WF,
INGRESSO STATO PRATICA WF,
DATA AFFIDAMENTO,
AGING,
AVVOCATO AFFIDATARIO,
INDIRIZZO RESIDENZA,
COMUNE RESIDENZA,
CAP RESIDENZA,
PROVINCIA RESIDENZA,
TELEFONO,
NUMERO FATTURA,
DATA FATTURA,
CODICE CONTRATTO,
IMPORTO SCADUTO,
IMPORTO A SCADERE,
IMPORTO SCOPERTO


objOld[row]= {
        'Codice Cliente': objNew[row]['codcliente'],
        'Codice OPEC': objNew[row]['opec'],
        'Rag Sociale - Cog e Nom': objNew[row]['ragioneSociale'],
        'Categoria di Diritto': objNew[row]['codCategoriaDiDiritto'],
        'Categoria di Diritto Des': objNew[row]['categoriaDiDiritto'],
        'Canale': objNew[row]['canale'],
        'DAT': objNew[row]['dat'],
        'Filiale': objNew[row]['filiale'],
        'Area Elenco': objNew[row]['areaElenco'],
        'AM Cognome Nome Cod': 'A',
        'ZM Cognome Nome Cod': 'A',
        'Agente Cognome Nome Cod': objNew[row]['agente'],
        'Area Stato': objNew[row]['codStatoPraticaWf'],
        'Area Stato des': objNew[row]['statoPraticaWf'],
        'Data Ingresso in stato': objNew[row]['ingressoStatoPraticaWf'],
        'Operatore': 'A',
        'Operatore Des': 'A', 
        'Data Affidamento a Operatore': objNew[row]['dataAffidamento'],
        'Giorni Aging': objNew[row]['aging'],
        'Area Funzionale': 'MP',
        'Area Funzionale des': objNew[row]['avvocatoAffidatario'],
        'Indirizzo di residenza': objNew[row]['indirizzoDiResidenza'],
        'Comune di residenza': objNew[row]['comuneResidenza'],
        'CAP di Residenza': objNew[row]['capResidenza'],
        'Provincia': objNew[row]['provinciaResidenza'],
        'N Telefonico': objNew[row]['telefono'],
        'Nr Fattura': objNew[row]['numeroFattura'],
        'Tipo Registro':'',
        'Data Fattura':objNew[row]['dataFattura'],
        'Numero Commissione': '',
        'Importo Scaduto EURO': objNew[row]['importoScaduto'],
        'Importo A Scadere EURO': objNew[row]['importoAScadere'],
        'Importo Scoperto EURO': objNew[

*/



