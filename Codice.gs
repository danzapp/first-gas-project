// versione aggiornata il 22/12/2016 
function doGet() {
   return HtmlService
      .createTemplateFromFile('Index')
      .evaluate();
}

function getData(row){

var ss = SpreadsheetApp.openById('1uktNytVd8-1evnvgzpsMi--bUTc0yQbFv4xoLpON6Dg')
var sheet = ss.getSheetByName('Anagrafica')
var dataRange = sheet.getDataRange().getValues()
var data =  JSON.stringify(dataRange[row-1])
return data
}