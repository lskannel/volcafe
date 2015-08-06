var scroll = new iScroll('wrapper', { vScrollbar: false, hScrollbar:false, hScroll: false });
var id = getUrlVars()["id"];
var np = getUrlVars()["np"];

var pathDirector='pics';
//var pathDirector='DCIM';
var db;

//document.addEventListener("deviceready", onDeviceReady, true);
setTimeout(onDeviceReady,2000);


function onDeviceReady() {
    db = window.openDatabase("PromotorDirectoryDB", "1.0", "PhoneGap Demo", 200000);
    db.transaction(getReportList, transaction_error);
}

function transaction_error(tx, error) {
    $('#busy').append(" ERROR ");
	//$('#busy').hide();
    //alert("Database Error: " + error);
}

function getReportList(tx) {
	//$('#busy').show();
	var sql = "select e.id, e.firstName, e.lastName, e.title, e.picture, e.managerId, count(r.id) reportCount " + 
		"from Promotor e left join Promotor r on r.managerId = e.id " +
		"where e.managerId=:id group by e.id order by e.lastName, e.firstName, e.managerId";
	tx.executeSql(sql, [id], getReportList_success);
}

function getReportList_success(tx, results) {
	$('#busy').hide();
    var len = results.rows.length;
    for (var i=0; i<len; i++) {
    	var Promotor = results.rows.item(i);
		$('#reportList').append('<li><a href="Promotordetails.html?id=' + Promotor.id + '&np=' + np + '">' +
				'<img src="' + pathDirector + '/' + Promotor.picture + '" class="list-icon2"/>' +
				'<p class="line13">' + Promotor.firstName + ' ' + Promotor.lastName + '</p>' +
				'<p class="line12">' + Promotor.title + '</p>' +
				'<span class="bubble">' + Promotor.reportCount + '</span></a></li>');
	}
    
    if(Promotor.title=='Productor'){
   	   $('#reportList').append('<li><a href="ingresa.html?id='+ id + '&idc=777&prd=' + Promotor.id + '&managerID=' + Promotor.managerId + '&prd1=">' +
			'<p class="line12"><h1>Agregar</h1></p>' +
			'</a></li>');
    }
    
    if(Promotor.title=='Finca'){
    	   $('#reportList').append('<li><a href="ingresa.html?id='+ id + '&idc=888&prd=' + Promotor.id + '&managerID=' + Promotor.managerId + '&prd1=">' +
 			'<p class="line12"><h1>Agregar</h1></p>' +
 			'</a></li>');
     }
	setTimeout(function(){
		scroll.refresh();
	});
	$('#busy').hide();
	db = null;
}

function getUrlVars() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}