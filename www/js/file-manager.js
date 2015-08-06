// <![CDATA[

var fileSystem;
var fileName;
var fileData;
var fileDirector;
var pathDirector='';
var devicePlatform;
var dir1, dir2, dir3;
var versionxml;
var version_server = 0;
var version_local = 0;
var promotorXML;
var productorXML;
var fincaXML;
var paisXML;
var deptosXML;
var ciudadesXML;
//var encuestaXML;
var id = getUrlVars()["id"];
var cargaCompleta = false;
var sql_tabla="";
var idtransaccion="";
var db;
var dbCreated = false;
var online = false;
var sqlremoto;
var webservice=false;



//document.addEventListener("deviceready", onDeviceReadyFM, true);
setTimeout(onDeviceReadyFM,500);
function deviceIsReady() { //prueba
}

function onErrorFM(e){
	//alert(" onerrorFM ");
	}

function getById(id) {
    return document.querySelector(id);
}

function initFileManager(){
	$('#busy').append("3");
	setTimeout(saveXMLFromServer,500);
}
function onDeviceReadyFM() {
	verificaBDWIFI();
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onFSSuccessFM, onErrorFM);
}

function verificaBDWIFI(){
	// verifica webservice activo
	var wsURL1 = "http://200.30.150.165:8080/webservidor/index.php?leer=5";
	var xhr1 = new XMLHttpRequest();
	var fileData1 = "";
	xhr1.open("get", wsURL1, true);
	xhr1.onload = function(){ 
			fileData1 = xhr1.responseText; 
			//alert(fileData1);	// se ejecuta despues y si tiene datos
			//alert(fileData1.length);
			webservice = (fileData1.length > 0);	
			};
	xhr1.send();
	//alert(fileData1);  // se ejecuta ante y esta vacio
	//return fileData1.length;
}
function pathImage(){
	devicePlatform = device.platform;
	dir1 = 'Data';
	switch(devicePlatform){
		case 'Android':
			dir1 = 'DCIM';
			break;
		case 'iOS':
			dir1 = 'DCIM\100APPLE';
			break;
		case "WinCE":
			dir1 = 'Documents';
			break;
		case "Win32NT":
			dir1 = 'Documents';
			break;
	}
	return dir1;
}
function onFSSuccessFM(fs) {
	//alert("hola");
    fileSystem = fs;
	devicePlatform = device.platform;
	switch(devicePlatform){
		case "Android":
			dir1 = "Android";
			dir2 = "data";
			dir3 = "com.kannel.android";
			break;
		case "iOS":
			dir1 = "Documents";
			dir2 = "data";
			dir3 = "com.kannel.ios";
			break;
		case "WinCE":
			dir1 = "Documents";
			dir2 = "data";
			dir3 = "com.kannel.wince";
			break;
		case "Win32NT":
			dir1 = "Documents";
			dir2 = "data";
			dir3 = "com.kannel.winc32nt";
			break;
	}
	
    fileSystem.root.getDirectory(dir1, {create: true, exclusive: false}, function(directoryEntry){
    	directoryEntry.getDirectory(dir2, {create: true, exclusive: false}, function(directoryEntry){
    		directoryEntry.getDirectory(dir3, {create: true, exclusive: false}, getFileDirectory, onErrorFM);
        }, onErrorFM);
    }, onErrorFM);
    
}
function getFileDirectory(directoryEntry){
	fileDirector = directoryEntry;
	pathDirector =  fileDirector.fullPath;
	cargaCompleta= true;
	pathDirector = "pics/";
	//alert(pathDirector);
}
function doCreateFile(){
	fileDirector.getFile(fileName, {create:true, exclusive: false}, createFile, onError);
}
function createFile(fileEntry1){
	fileEntry1.createWriter(function(writerOb) {
		//writerOb.truncate(0);
        writerOb.write(fileData);
 
        doReadFile();
    });
}
function doReadFile() {
	fileDirector.getFile(fileName, {create:false}, readFile, onReadError);
}
function readFile(fileEntry1) {
    reader = new FileReader();
    reader.onloadend = function(e) {
        fileData = e.target.result;
    };
    reader.readAsText(fileEntry1);
    
}
function doDeleteFile() {
	fileDirector.getFile(fileName, {create:false}, deleteFile, onError);
}
function deleteFile(fileEntry1){
	fileEntry1.remove();
}
function onReadError(e) {  
	fileData = null;
}
function onError(e) {   
}
function onBackKeyDown() {
	if(window.location.href.toString().indexOf("index.html")!=-1){
		navigator.app.exitApp();
	}
	window.location.href = "index.html";
}
function onMenuKeyDown(){
	window.location.href = "menu.html";
}

function saveXMLFromServer(){
//			fileName = "municipio.xml";
//			fileName = "depto.xml";
	$('#busy').append("4");
	//if(webservice){
	if(1==1){
	var wsURL1 = "http://200.30.150.165:8080/webservidor/index.php?leer=1";
	var xhr2 = new XMLHttpRequest();
	xhr2.open("get", wsURL1, true);
	xhr2.onload = function(){ 
			var fileData2 = xhr2.responseText; 
			encuestaXML = fileData2;
			db.transaction(leeDB1, transaction_error);	
			};
	xhr2.send();
	
	
	var wsURL8 = "http://200.30.150.165:8080/webservidor/index.php?leer=8";
	var xhr8 = new XMLHttpRequest();
	xhr8.open("get", wsURL8, true);
	xhr8.onload = function(){ 
			var fileData8 = xhr8.responseText; 	
			fincaXML = fileData8;
			db.transaction(leeDB8, transaction_error);	
			};
	xhr8.send();

	var wsURL9 = "http://200.30.150.165:8080/webservidor/index.php?leer=14";
	var xhr9 = new XMLHttpRequest();
	xhr9.open("get", wsURL9, true);
	xhr9.onload = function(){ 
			var fileData9 = xhr9.responseText; 	
			productorXML = fileData9;
			db.transaction(cargaProductor, transaction_error);	
			};
	xhr9.send();
	
	var wsURL = "http://200.30.150.165:8080/webservidor/index.php?leer=10";
	var xhr = new XMLHttpRequest();
	xhr.open("get", wsURL, true);
	xhr.onload = function(){			
			var fileData = xhr.responseText; 		
			promotorXML = fileData;		
			$('#busy').append("5");
			db.transaction(leeDB3, transaction_error);			
			};
	xhr.send();
	

	var wsURL11 = "http://200.30.150.165:8080/webservidor/index.php?leer=11";
	var xhr11 = new XMLHttpRequest();
	xhr11.open("get", wsURL11, true);
	
	xhr11.onload = function(){ 
			var fileData11 = xhr11.responseText; 
			paisXML = fileData11;
			db.transaction(cargaPais, transaction_error);	
			};
	xhr11.send();
	
		var wsURL12 = "http://200.30.150.165:8080/webservidor/index.php?leer=12";
	var xhr12 = new XMLHttpRequest();
	xhr12.open("get", wsURL12, true);
	
	xhr12.onload = function(){ 
			var fileData12 = xhr12.responseText; 
			deptosXML = fileData12;
			db.transaction(cargaDepto, transaction_error);	
			};
	xhr12.send();
	
	var wsURL13 = "http://200.30.150.165:8080/webservidor/index.php?leer=13";
	var xhr13 = new XMLHttpRequest();
	xhr13.open("get", wsURL13, true);
	
	xhr13.onload = function(){ 
			var fileData13 = xhr13.responseText; 
			ciudadesXML = fileData13;
			db.transaction(cargaCiudades, transaction_error);	
			};
	xhr13.send();
	
	} else {$('#busy').append("6"); db.transaction(leeDB, transaction_error);} 
}


function grabar_GPS(){
	db = window.openDatabase("PromotorDirectoryDB", "1.0", "PhoneGap Demo", 2000);
	db.transaction(grabaGPS);
}

function grabaGPS(tx){
	var ide  = getUrlVars()["ide"];
	//alert("grabar " + ide + " latitud=" + latitud_tel +  "  longitud=" + longitud_tel);
	
	//local
	var sql = "update Promotor " + 
	" set latitude = " + latitud_tel.toString() + ", longitude = " + longitud_tel.toString() + "  where id = " + ide + 
	";";  
	//alert(sql);
	tx.executeSql(sql);

	//alert("Latitud=" + latitud_tel.toString() +" --- Longitud=" +  longitud_tel.toString());
}

function grabarGPSremoto(){

	//grabar GPS en remoto
	var wsURL = "http://52.10.26.110/webservidor/serverVOLCAFE.php?WSDL";
	var soapMessage = '<?xml version="1.0" encoding="UTF-8"?>' +
	' <SOAP-ENV:Envelope >'+
					'<SOAP-ENV:Body>'+
						'<tns:WS04 xmlns:tns="urn:ws04wsdl#ws04">' +
							'<id_productor xsi:type="xsd:string">'+ide+'</id_productor>'+
							'<lat_productor xsi:type="xsd:string">'+latitud_tel +'</lat_productor>'+
							'<lon_productor xsi:type="xsd:string">'+longitud_tel +'</lon_productor>'+
						'</tns:WS04>'+
					'</SOAP-ENV:Body>'+
				'</SOAP-ENV:Envelope>';
	
	$.ajax({
		url: wsURL,
		type: "POST",
		dataType: "xml",
		data: soapMessage,
		success: function(any, status, data){
			var respuesta = setXMLSintax(data.responseText);
			//alert(respuesta);
			//doCreateFile();
		},
		complete: function(data){
			db.transaction(saveXMLFromServer, transaction_error);
			//alert("grabado");
		},
		contentType: "text/xml"
	});
	

}

function regresa() { 
        //$('#ventanaDerecha').html="";
		//$('#ventanaDerecha').append("<iframe src='fondoVolcafe.html' width='800px' height='1000px'></iframe>"); 
}
//function regresa() { window.location = "Promotordetails.html?id="+id+ "&np=" + np ;}
function cancela() { //window.location = "fondoVolcafe.html";
        window.parent.location = "Promotordetails.html?id="+id+ "&np=" + np ;
     	//$('#Promotordetails #wrapper #ventanaDerecha').empty("");
		//$('#Promotordetails #wrapper #ventanaDerecha').append("<iframe src='fondoVolcafe.html' width='800px' height='1000px'></iframe>"); 
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


function sincroniza_web_respuestas()
{  
	$('#busy').show();
    db = window.openDatabase("PromotorDirectoryDB", "1.0", "PhoneGap Demo", 1000);
    db.transaction(ciclo_respuestas_web);	
	}

function ciclo_respuestas_web(tx){
	var sql = 'select  idpregunta, productor, plazo, respuesta, correctiva, responsable, indicador, formulario' +
    'from respuestas order by productor, id ';
    tx.executeSql(sql,[], ciclo_respuestas_web_successs);
}

function ciclo_respuestas_web_successs(tx,results){

	var len = results.rows.length;
    var idencuesta = 0; // respuestas.idencuesta;
    var i = 0;
    //for (var i=0; i<len; i++) {	
       	var respuestas = results.rows.item(i); 
       	var orden_pregunta = respuestas.idpregunta - (respuestas.idpregunta/100).toFixed(0) *100;
       	var productor  = (respuestas.productor/1000).toFixed(0);
       	var grupo      = (respuestas.idpregunta/100).toFixed(0);// respuestas.grupo;
       	var plazo      = respuestas.plazo;
       	var finca      = "1";
       	var cosecha    = "2014-2015";

 //alert(productor);      	
       	var opcion     = respuestas.respuesta;
//alert(opcion);       	
//alert(respuestas.idpregunta);
       	var correctiva = respuestas.correctiva;
       	var responsable= respuestas.responsable;
       	var indicador  = respuestas.indicador;
       	var estado     = 1;
       	var empresa    = 21;
       	var formulario = 3;
       	var ide= respuestas.idencuesta;
       	// empresa,formulario,grupo,encuesta,pregunta,opcion,correctiva,responsable,indicador,fecha,estado
    	var env ='&campos='+empresa+','+formulario+','+grupo+','+idencuesta+','+orden_pregunta+','+opcion+','+plazo
    	          +','+estado+','+productor+','+finca+','+cosecha+'&ac='+correctiva+'&ar='+responsable+'&ai='+indicador;
    	
//alert(sql);
    	var wsURL = "http://200.30.150.165:8080/webservidor/index.php?leer=27"+env;
    	var xhr = new XMLHttpRequest();
    	xhr.open("get", wsURL, true);
    	xhr.onload = function(){			
    			var fileData = xhr.responseText; 
    			idencuesta = fileData;	
    		//alert(idencuesta);
                // ya con el numero de encuesta se continua el ciclo
    			ciclo_respuestas_web2_successs(tx,results,idencuesta,productor);
    	};
    	xhr.send();

    //}
    	  $('#busy').hide();
	
}

function ciclo_respuestas_web2_successs(tx,results,idencuesta,productor){
    var len = results.rows.length;
//alert(idencuesta);

    var i=1; 
    var productor1 = productor;
    while (i<len && productor==productor1)
    	{
    	i++;
       	var respuestas = results.rows.item(i); 
       	var orden_pregunta = respuestas.idpregunta - (respuestas.idpregunta/100).toFixed(0) *100;
       	var productor  = (respuestas.productor/1000).toFixed(0);
       	var grupo      = (respuestas.idpregunta/100).toFixed(0);// respuestas.grupo;
       	var plazo      = respuestas.plazo;
       	var finca      = "1";
       	var cosecha    = "2014-2015";

       	var opcion     = respuestas.respuesta;
  //alert(opcion);
  //alert(respuestas.idpregunta);
        var correctiva = respuestas.correctiva;
       	var responsable= respuestas.responsable;
       	var indicador  = respuestas.indicador;
       	var estado     = 1;
       	var empresa    = 21;
       	var formulario = 3;
       	var ide= respuestas.idencuesta;


       	// empresa,formulario,grupo,encuesta,pregunta,opcion,correctiva,responsable,indicador,fecha,estado
    	var env ='&campos='+empresa+','+formulario+','+grupo+','+idencuesta+','+orden_pregunta+','+opcion+','+plazo
        +','+estado+','+productor+','+finca+','+cosecha+'&ac='+correctiva+'&ar='+responsable+'&ai='+indicador;
    //alert(sql);	
    	var wsURL = "http://200.30.150.165:8080/webservidor/index.php?leer=27"+env;
    	var xhr = new XMLHttpRequest();
    	xhr.open("get", wsURL, true);
    	xhr.onload = function(){			
    			var fileData = xhr.responseText; 
    	};
    	xhr.send();
    }
    $('#busy').hide();
   /* if(i<len){
		var sql = 'select  * ' +
	    'from respuestas where productor > ' + productor1 +' order by productor, id';
		ciclo2(sql);
	 }*/
	
    $('#busy').hide();
	
}

function ciclo2(sql){

//	tx.executeSql(sql,[], ciclo_respuestas_web_successs);
//	$('#busy').show();
    db = window.openDatabase("PromotorDirectoryDB", "1.0", "PhoneGap Demo", 2000);
    db.transaction(ciclo_respuestas_web_2);		
}

function ciclo_respuestas_web_2(tx){
//alert(sql);
    tx.executeSql(sql,[], ciclo_respuestas_web_successs);
}

//]]>