var map;
var latitud=15;
var longitud=-90;
var latitud_tel=15.0;
var longitud_tel=-90.0;
var pinP = "img/pinpersona.png";
var pinN = "img/pinnormal.png";
var ide;
var np = getUrlVars()["np"];
loadPosition();

function locproductor(){	
	var lat  = getUrlVars()["lat"];
	var lon  = getUrlVars()["lon"];
	var tit  = getUrlVars()["tit"];
	var cont = getUrlVars()["cont"];
	 ide  = getUrlVars()["ide"];
	
	loadMap();
	addMarker(lat, lon, pinP, tit, cont);
	
	//visualizar sub-alternos
	
	db = window.openDatabase("PromotorDirectoryDB", "1.0", "PhoneGap Demo", 20000);

    db.transaction(getPromotor2, transaction_error2);

}

function transaction_error2(tx, error) {
	$('#busy').hide();
    //alert("Database Error: " + error);
}

function getPromotor2(tx) {
	$('#busy').show(); 
	var sql = "select e.id, e.firstName, e.lastName, e.managerId, e.title, e.department, (d.namedepartamento || '-' || m.namemunicipio) city, e.officePhone, e.cellPhone, " +
	"e.email, e.picture, m.firstName managerFirstName, m.lastName managerLastName, e.latitude, e.longitude, e.encuesta, e.address, count(r.id) reportCount " +
	"from Promotor e left join Promotor r on r.managerId = e.id left join Promotor m on e.managerId = m.id " +
	"left join municipio m on m.idmunicipio = e.city left join departamento d on m.iddepartamento = d.iddepartamento " + 
	"where e.managerId =:ide group by e.lastName order by e.lastName, e.firstName";

	tx.executeSql(sql, [ide], getPromotor_success2);
	
}

function getPromotor_success2(tx, results){
    var len = results.rows.length;
    
    for (var i=0; i<len; i++) {
    	var promotor = results.rows.item(i);
    	//alert(promotor.firstName);
    	addMarker(promotor.latitude, promotor.longitude, pinN, "<a href='Promotordetails.html?id=" + promotor.id+ '&np=' + np  +"'>"+ promotor.firstName+" "+promotor.lastName + "</a>", "");	
    }
    $('#busy').hide();
}



function posicionactual(){
	//alert(latitud_tel);
	addMarker(latitud_tel, longitud_tel, pinP, "Actual","  Lat="+latitud_tel.toString() + "  Lon=" + longitud_tel.toString());
	// webservice que actualiza coordenadas
	
}



function setCoordenadas(position){
	 latitud = position.coords.latitude;
     longitud = position.coords.longitude;
	 longitud_tel = longitud;
	 latitud_tel  = latitud;
	 
}
function loadMap(){
	var mapContainer = document.getElementById('gmapContent');
	var centerPosition = new google.maps.LatLng(latitud, longitud);
	var startZoom = 7;
	initMap(mapContainer, centerPosition, startZoom);
}
function initMap(mapContainer, centerPosition, startZoom){
	var mapProperties = {
		center: centerPosition,
		zoom: startZoom,
		mapTypeId:google.maps.MapTypeId.ROADMAP
	};
	map = new google.maps.Map(mapContainer,mapProperties);
	google.maps.event.addListener(map, 'click', function() {
		hideInfowindows();
	});
	//loadMarkers();
}

function addMarker(lat, long, pin, title, content){
	var posicion = new google.maps.LatLng(lat, long);
	var marker = new google.maps.Marker({
		position: posicion,
		icon: pin
	});
	marker.setMap(map);
	if(typeof title != "undefined"){
		addInfoWindow(title, content, marker);
	}
	return marker;
}
function addInfoWindow(title, content, marker){
	var infowindow = new google.maps.InfoWindow({
		content: "<div style='text-decoration:none; width:175px; text-align: center'>" +
					title + content +
				 "</div>"
	});
	google.maps.event.addListener(marker, 'click', function() {
		hideInfoWindows();
		infowindow.open(map, marker);
		//map.panTo(marker.getPosition());
	});
	google.maps.event.addListener(map, 'mouseout', function() {
		infowindow.close();
	});
}
function hideInfoWindows(){
	google.maps.event.trigger(map,"mouseout");
}
function onGeoError(){
	$("#gmapContent").html("<span class='error-message'>"+
			"Activa los servicios de ubicación y verifica tu conexión a internet</span>");
}
function loadPosition(){
	var options = {
	  enableHighAccuracy: true,
	  timeout: 10000,
	  maximumAge: 0
	};
	if(navigator.geolocation){
		navigator.geolocation.getCurrentPosition(setCoordenadas, onGeoError, options);
	}else{
		navigator.notification.alert("La geolocalización no es soportada.",function(){},"Notificación", "Aceptar");
	}
}
function reloadMap(){
	$("#geoPage").on( "pageshow", function( event, data ){
		var center = new google.maps.LatLng(latitud_tel, longitud_tel);
	    google.maps.event.trigger(map, "resize");
	    map.setCenter(center);
	});
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