/*<html>
<head>
  <meta charset="utf-8"/>
  <meta name="format-detection" content="telephone=no"/>
  <meta name="msapplication-tap-highlight" content="no"/>
  <!-- WARNING: for iOS 7, remove the width=device-width and height=device-height attributes. See https://issues.apache.org/jira/browse/CB-4323 -->
  <meta name="viewport" content="user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1, width=device-width, height=device-height"/>
  <link rel="stylesheet" type="text/css" href="css/index.css"/>
  <title>Hello World</title>
</head>
<body>
<div class="app">
  <h1>Apache Cordova</h1>

  <div id="deviceready" class="blink">
    <p class="event listening">Connecting to Device</p>

    <p class="event received">Device is Ready</p><br/>
    <button onclick="openCalendar()">open calendar</button><br/><br/>
    <button onclick="listCalendars()">list calendars</button><br/><br/>
    <button onclick="createCalendar()">create calendar</button><br/><br/>
    <button onclick="createCalendarEvent()">create event</button><br/><br/>
    <button onclick="deleteEvent()">delete event</button><br/><br/>
    <button onclick="findEventWithFilter()">find event with filter</button><br/><br/>
    <button onclick="findEventNoFilter()">find event no filter</button>
  </div>
</div>
<script type="text/javascript" src="cordova.js"></script>
<script type="text/javascript" src="index.js"></script>
<script>
*/
  var np = getUrlVars()["np"];
  var title = 'Mi Actividad Volafe';
  var loc = 'Finca a vistar ....';
  var notes = 'Realizar: diagnostico, presntacion y plan de accion.';
  var startDate = new Date();
  var endDate = new Date();
  var calendarName = "VolcafeWay";

  // clean up the dates a bit
  startDate.setMinutes(0);
  endDate.setMinutes(0);
  startDate.setSeconds(0);
  endDate.setSeconds(0);

  // add a few hours to the dates, JS will automatically update the date (+1 day) if necessary
  startDate.setHours(startDate.getHours() + 2);
  endDate.setHours(endDate.getHours() + 3);

  function onSuccess(msg) {
   // alert('Calendar success: ' + JSON.stringify(msg));
  }

  function onError(msg) {
    alert('Calendar error: ' + JSON.stringify(msg));
  }

  function openCalendar() {
    // today + 3 days
   // var d = new Date(new Date().getTime() + 3*24*60*60*1000);
    var d = new Date(new Date());
    d.getDate();
    //var d="";         
    window.plugins.calendar.openCalendar(d, onSuccess, onError);
  }

  function listCalendars() {
    window.plugins.calendar.listCalendars(onSuccess, onError);
  }

  function createCalendar() {
    window.plugins.calendar.createCalendar(calendarName, onSuccess, onError);
  }

  function deleteEvent() {
    window.plugins.calendar.deleteEvent(title, loc, notes, startDate, endDate, onSuccess, onError);
  }

  function createCalendarEvent() {
	title     = document.getElementById('title').value;
	loc       = document.getElementById('loc').value;
	notes     = document.getElementById('notes').value;
	startDate = new Date(document.getElementById('startDate').value);
	endDate   = new Date(document.getElementById('endDate').value);	
	
    window.plugins.calendar.createEvent(title, loc, notes, startDate, endDate, onSuccess, onError);
  }

  function findEventWithFilter() {
    window.plugins.calendar.findEvent(title, loc, notes, startDate, endDate, onSuccess, onError);
  }

  function findEventNoFilter() {
    window.plugins.calendar.findEvent(null, null, null, startDate, endDate, onSuccess, onError);
  }

  window.onerror = function(msg, file, line) {
    //alert(msg + '; ' + file + '; ' + line);
  };
  
// se crea default calendario Vocalfe
  $('#busy').hide();
  createCalendar();
/*
</script>
</body>
</html>*/

  
  