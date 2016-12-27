/***************************************************
This Google Script will send an email notification to you or other email addresses when a file in a Google Drive folder has been added, or modified. 06-07-16
***************************************************/
function checkForChangedFiles() {

// edit this line with the ID "XXXXXXXxxXXXwwerr0RSQ2ZlZms" of the folder you want to monitor for changes
var folderID = affidiDaImportareFolderId

var folderSearch = folderID + " " + "in parents";
var ss = ssDB 
var sheet = sheetImpostazioni
var email = sheet.getRange("H1").getValue();
var timezone = ss.getSpreadsheetTimeZone();
var today = new Date();
// Setup script to run next day, set time below to 24 hours. Set to 60 seconds for testing changes same day
// 60 * 1000 = 60 second
// 60* (60 * 1000) = 60 mins which is 1 hour
// 24* (60* (60 * 1000)) = 1 day which 24 hours
//var oneDayAgo = new Date(today.getTime() - 1 * 24 * 60 * 60 * 1000); 
var oneDayAgo = new Date(today.getTime() - 1 * 60 * 1000); 

var startTime = oneDayAgo.toISOString();

var search = '(trashed = true or trashed = false) and "'+ folderSearch +'" and (modifiedDate > "' + startTime + '")'; 
Logger.log(search)
var files = DriveApp.searchFiles(search);
 var file = files.next();
   Logger.log(file.getName())
if (files) {
  
var row = "", count=0;

while(files.hasNext()) {

var file = files.next();
var fileName = file.getName();
Logger.log(fileName)
var fileURL = file.getUrl();
var lastUpdated = Utilities.formatDate(file.getLastUpdated(), timezone, "yyyy-MM-dd HH:mm");
var dateCreated = Utilities.formatDate(file.getDateCreated(), timezone, "yyyy-MM-dd HH:mm")

row += "<li>" + lastUpdated + " <a href='" + fileURL + "'>" + fileName + "</a></li>";

sheet.appendRow([dateCreated, lastUpdated, fileName, fileURL]);

count++;
}

if (row !== "") {
row = "<p>" + count + " file(s) has been changed. Here's the list:</p><ol>" + row + "</ol>";
row += "<br><small>To stop these notifications, please reply to this email</a>.</small>";
MailApp.sendEmail(email, "Updated file Activity Report", "", {htmlBody: row});
}
else {
  Logger.log('non ci sono files che corrispondono al criterio impostato')
}
}
}


function driveActivityReport() {
  
  var folderID = "0BznBNzYR5OHDT2hiZ01IRFpYbG8"
  var folderSearch = "'"+folderID + "' " + "in parents";
  Logger.log(folderSearch)
  var ss = ssDB
  var sheet = sheetImpostazioni
  
  // Get the spreadsheet time zone
  
  var timezone = ss.getSpreadsheetTimeZone();
  
  // Find files modified in the last 24 hours
  
  var today     = new Date();
  var oneDayAgo = new Date(today.getTime() - 1 * 24 * 60 * 60 * 1000);  
  var startTime = oneDayAgo.toISOString();
  
  // The magic search expression
  //var search = '(trashed = true or trashed = false) and (modifiedDate > "' + startTime + '")';
  var search = '(trashed = true or trashed = false) and '+ folderSearch +' and (modifiedDate > "' + startTime + '")'; 
  Logger.log(search)
  var files  = DriveApp.searchFiles(search);
  
  // Loop through all the files in the search results
  while( files.hasNext() ) {
    
    var file = files.next();
    
    var fileName    = file.getName();
    var fileURL     = file.getUrl();
    var dateCreated =  Utilities.formatDate(file.getDateCreated(), timezone, "yyyy-MM-dd HH:mm")
        
    sheet.appendRow([dateCreated, fileName, fileURL]);
    
  }
 
}

function listFilesInFolder() {
  var MAX_FILES = 20; //use a safe value, don't be greedy
  var id = affidiDaImportareFolderId;
  var scriptProperties = PropertiesService.getScriptProperties();
  var lastExecution = scriptProperties.getProperty('LAST_EXECUTION');
  if( lastExecution === null )
    lastExecution = '';

  var continuationToken = scriptProperties.getProperty('IMPORT_ALL_FILES_CONTINUATION_TOKEN');
  var iterator = continuationToken == null ?
    DriveApp.getFolderById(id).getFiles() : DriveApp.continueFileIterator(continuationToken);


  try { 
    for( var i = 0; i < MAX_FILES && iterator.hasNext(); ++i ) {
      var file = iterator.next();
      var dateCreated = formatDate(file.getDateCreated());
      if(dateCreated > lastExecution)
        processFile(file);
    }
  } catch(err) {
    Logger.log(err);
  }

  if( iterator.hasNext() ) {
    scriptProperties.setProperty('IMPORT_ALL_FILES_CONTINUATION_TOKEN', iterator.getContinuationToken());
  } else { // Finished processing files so delete continuation token
    scriptProperties.deleteProperty('IMPORT_ALL_FILES_CONTINUATION_TOKEN');
    scriptProperties.setProperty('LAST_EXECUTION', formatDate(new Date()));
  }
}

function formatDate(date) { return Utilities.formatDate(date, "GMT", "yyyy-MM-dd HH:mm:ss"); }

function processFile(file) {
  var id = file.getId();
  var name = file.getName();
  //your processing...
  Logger.log(name);
}


/**
 * Watch for all changes to a user's Drive.
 *
 * @param {String} channelId Unique string that identifies this channel.
 * @param {String} channelType Type of delivery mechanism used for this channel.
 * @param {String} channelAddress Address where notifications are delivered.
 */
function watchChange(channelId, channelType, channelAddress) {
  var resource = {
    'id': channelId,
    'type': channelType,
    'address': channelAddress
  };
  var request = gapi.client.drive.changes.watch({
    'resource': resource
  });
  request.execute(function(channel){console.log(channel);});
}