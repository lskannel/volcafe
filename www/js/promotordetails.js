var scroll = new iScroll('wrapper', { vScrollbar: false, hScrollbar:false, hScroll: false });
var id = getUrlVars()["id"];
var db;
var dbCreated = false;
var np = getUrlVars()["np"];
//alert(pathDirector);
ventanaDerechaDefault();

//document.addEventListener("deviceready", onDeviceReady, true);
setTimeout(onDeviceReady,2000);

function onDeviceReady() {
	//console.log("Accesando base de datos");
    db = window.openDatabase("PromotorDirectoryDB", "1.0", "PhoneGap Demo", 2000);
	//console.log("Base de datos disponible");
    
    db.transaction(getPromotor, transaction_error);
    
}

function transaction_error(tx, error) {
	$('#busy').hide();
   // alert("Database Error: "+ id + " - " + error);
}

function getPromotor(tx) {

	var sql = "select e.id, e.firstName, e.lastName, e.managerId, e.title, e.department, 'pendiente' city, e.officePhone, e.cellPhone, e.formulario2, e.nivel, " +
	"e.email, e.picture, m.firstName managerFirstName, m.lastName managerLastName, e.latitude, e.longitude, e.formulario, e.encuesta, e.address, " +
	"e.metrica0101, e.metrica0102, e.metrica0103, e.metrica0201, e.metrica0202, e.metrica0203, count(r.id) reportCount " +
	"from Promotor e left join Promotor r on r.managerId = e.id left join Promotor m on e.managerId = m.id " +
	" " + 
	"where e.id=:id group by e.lastName order by e.lastName, e.firstName";
	//alert(sql);
	tx.executeSql(sql, [id], getPromotor_success);
	
}

function getPromotor_success(tx, results) {
 //$('#busy').append(' getPromotors_sucess-Details ');
 var len = results.rows.length;
 if (len>0) {
	var Promotor = results.rows.item(0);

var pathDirector='pics/';
	//var pathDirector='/DCIM';
	$('#PromotorPic').attr('src', pathDirector +  Promotor.picture);
	$('#PromotorPic').attr('alt', pathDirector +  Promotor.picture);
	$('#fullName').text(Promotor.firstName + ' ' + Promotor.lastName);
	$('#PromotorTitle').text(Promotor.title);
	$('#city').text(Promotor.id);
	//console.log(Promotor.officePhone);
	
	if (Promotor.managerId>0 && parseInt(Promotor.nivel) >= parseInt(np)) {
		$('#actionList').append('<li><a href="Promotordetails.html?id=' + Promotor.managerId + '&np=' + np + '"><p class="line3">Lo supervisa</p>' +
				'<p class="line2">' + Promotor.managerFirstName + ' ' + Promotor.managerLastName + '</p></a></li>');
	}
	
	
	if (Promotor.reportCount>0) {
		$('#actionList').append('<li><a href="reportlist.html?id=' + Promotor.id + '&np=' + np + '"><p class="line3">Cantidad a su cargo</p>' +
				'<p class="line2">' + Promotor.reportCount + '</p></a></li>');
	}
	
	
	if (Promotor.encuesta) {
		$('#actionList').append('<li><a name="ingresa.html?id='+ id +'&idc=' + Promotor.encuesta + '&prd=' + Promotor.id + '&managerID=' + Promotor.managerId + '&tit=Diagnostico&np=' + np + '" onclick="ventanaDerecha(name)" ><p class="line3">Diagnostico</p>' +
				 '<img src="img/encuesta.png" class="action-icon"/></a></li>');
		}
		

	if (Promotor.encuesta) {
		$('#actionList').append('<li><a name="respuesta.html?id='+ id +'&idc=' + Promotor.encuesta + '&prd=' + Promotor.id + '&managerID=' + Promotor.managerId + '&tit=Plan Accion&np=' + np + '" onclick="ventanaDerecha(name)"><p class="line3">Plan Accion</p>' +
				 '<img src="img/encuesta.png" class="action-icon"/></a></li>');
		} 
		
		
	if (Promotor.formulario) {
		$('#actionList').append('<li><a name="ingresa.html?id='+ id +'&idc=' + Promotor.formulario + '&prd=' + Promotor.id + '&managerID=' + Promotor.managerId + '&tit=Datos&np=' + np + '" onclick="ventanaDerecha(name)"><p class="line3">Datos</p>' +
				 '<img src="img/encuesta.png" class="action-icon"/></a></li>');
		}	
		
	if (Promotor.formulario2) {
		$('#actionList').append('<li><a name="ingresa.html?id='+ id +'&idc=' + Promotor.formulario2 + '&prd=' + Promotor.id + '&managerID=' + Promotor.managerId + '&tit=Linea Base&np=' + np + '" onclick="ventanaDerecha(name)"><p class="line3">Linea Base</p>' +
				 '<img src="img/encuesta.png" class="action-icon"/></a></li>');
		}	
	

	if (Promotor.formulario3) {
		$('#actionList').append('<li><a name="ingresa.html?id='+ id +'&idc=' + Promotor.formulario3 + '&prd=' + Promotor.id + '&managerID=' + Promotor.managerId + '&tit=Certificaciones&np=' + np + '" onclick="ventanaDerecha(name)"><p class="line3">Certificaciones</p>' +
				 '<img src="img/encuesta.png" class="action-icon"/></a></li>');
		}	
		
	if (Promotor.formulario4) {
		$('#actionList').append('<li><a name="ingresa.html?id='+ id +'&idc=' + Promotor.formulario4 + '&prd=' + Promotor.id + '&managerID=' + Promotor.managerId + '&tit=Variedad de Productos&np=' + np + '" onclick="ventanaDerecha(name)"><p class="line3">Variedad de Productos</p>' +
				 '<img src="img/encuesta.png" class="action-icon"/></a></li>');
		}
		
	if (Promotor.formulario5) {
		$('#actionList').append('<li><a name="ingresa.html?id='+ id +'&idc=' + Promotor.formulario5 + '&prd=' + Promotor.id + '&managerID=' + Promotor.managerId + '&tit=Otros&np=' + np + '" onclick="ventanaDerecha(name)"><p class="line3">Otros</p>' +
				 '<img src="img/encuesta.png" class="action-icon"/></a></li>');
		}	
 
	
	if (Promotor.formulario2) {
		$('#actionList').append('<li><a name="actividades.html?id='+ id +'&idc=' + Promotor.formulario2 + '&prd=' + Promotor.id + '&tit=Calendarizar Actividades&np=' + np + '" onclick="ventanaDerecha(name)"><p class="line3">Calendarizar Actividades</p>' +
				 '<img src="img/calendario.png" class="action-icon"/></a></li>');
		}
		
	if (Promotor.managerId) {
		var metricas = '&m0101=' + Promotor.metrica0101 + '&m0102=' + Promotor.metrica0102+ '&m0103=' + Promotor.metrica0103+ '&m0201=' + Promotor.metrica0201+ '&m0202=' + Promotor.metrica0202+ '&m0203=' + Promotor.metrica0203;
		
		$('#actionList').append('<li><a name="indicadores.html?id='+ id  + metricas + '&np=' + np + '" onclick="ventanaDerecha(name)"><p class="line3">Indicadores</p>' +
				'<img src="img/indicador.png" class="action-icon" /></a></li>');
		}	
		
		
	if (Promotor.latitude) {
		$('#actionList').append('<li><a name="mapa.html?id='+ id +'&lat=' + Promotor.latitude + '&lon=' + Promotor.longitude + '&ide=' + Promotor.id + '&tit=' + Promotor.firstName + '&cont=<p>' + Promotor.address+ '&np=' + np + '</p>"  onclick="ventanaDerecha(name)"><p class="line3">Ubicacion</p>' +
				'<p class="line2">(' + Promotor.latitude + ',' + Promotor.longitude + ')</p><img src="img/mapa.png" class="action-icon"/></a></li>');
		}
    
	
	if (Promotor.email) {
		$('#actionList').append('<li><a href="mailto:' + Promotor.email + '"><p class="line3">Email</p>' +
				'<p class="line2">' + Promotor.email + '</p><img src="img/mail.png" class="action-icon"/></a></li>');
		}
				
	if (Promotor.officePhone) {
		$('#actionList').append('<li><a href="tel:' + Promotor.officePhone + '"><p class="line3">Llamar a telefono</p>' +
				'<p class="line2">' + Promotor.officePhone + '</p><img src="img/phone.png" class="action-icon"/></a></li>');
	}
	
	if (Promotor.cellPhone) {
		$('#actionList').append('<li><a href="tel:' + Promotor.cellPhone + '"><p class="line3">Llamar a Celular</p>' +
				'<p class="line2">' + Promotor.cellPhone + '</p><img src="img/phone.png" class="action-icon"/></a></li>');
		$('#actionList').append('<li><a href="sms:' + Promotor.cellPhone + '"><p class="line3">SMS</p>' +
				'<p class="line2">' + Promotor.cellPhone + '</p><img src="img/sms.png" class="action-icon"/></a></li>');
	}
	

	if (1==2) {
		$('#actionList').append('<li><a href="Camera: mapa.html?id='+ id +'&lat=' + Promotor.latitude + '&lon=' + Promotor.longitude + '&ide=' + Promotor.id + '&tit=' + Promotor.firstName + '&cont=<p>' + Promotor.address + '</p>"><p class="line3">Area Finca</p>' +
				'<p class="line2">(' + Promotor.latitude + ',' + Promotor.longitude + ')</p><img src="img/mapa.png" class="action-icon"/></a></li>');
		}
	
	
	$('#busy').hide();
	setTimeout(function(){
		scroll.refresh();
	});
	//db = null;
 }
}

function getUrlVars1() {
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

function capturePhoto() {
	  $('#busy').append(' capturePhoto ');
	  navigator.camera.getPicture(onPhotoDataSuccess, onFail, {
		    destinationType: Camera.DestinationType.FILE_URI,
		    sourceType: sourceType,
		    correctOrientation: true
		  });

	}

//control de error en la captura de fotos
function onFail(message) {
  //alert('Fallo en la captura: ' + message);
}

//captura correcta
function onPhotoDataSuccess(imageData) {
  //obtenemos el objeto foto
  var foto = document.getElementById('PromotorPic');
  //lo mostramos
  foto.style.display = 'block';

  foto.src = imageData;

}

function ventanaDerecha(name){
        //window.location = name;
		$('#Promotordetails #wrapper #ventanaDerecha').empty("");
		$('#Promotordetails #wrapper #ventanaDerecha').append("<iframe src='"+name+"' width='1000px' height='1200px' frameborder='0' scrolling='no'></iframe>"); 
}

function ventanaDerechaDefault(){
      //alert(window.location.href);
		var l = id.length;
		var idefa =  id;
		//if ( l > 3) { idefa = id.substring(0,l-3);}
		$('#Promotordetails #wrapper #ventanaDerecha').empty("");
		$('#Promotordetails #wrapper #ventanaDerecha').append("<iframe src='datos.html?id="+idefa+"&np="+np+"' width='1200px' height='1200px' frameborder='0' scrolling='no'></iframe>"); 
		//$('#Promotordetails #wrapper #ventanaExtrema').empty("");
		//$('#Promotordetails #wrapper #ventanaExtrema').append("<iframe src='carrousel.html?id="+idefa+"&np="+np+"' width='800px' height='1000px' frameborder='0' scrolling='yes'></iframe>"); 

}