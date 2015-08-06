
var PaisDeptoMunicipio;

    	var Productor1;
		var idfinca;
		var nombre;
		var direccion;
		var telefono;
		var pais;
		var depto;
		var ciudad;
		var latitud;
		var longitud;
		var area_total;
		var area_cultivada;
		var cosecha_promedio;
		var fecha_inicio_cosecha;
		var lotes;
		var area_otros_cultivos;
		var area_conservacion;
		var densidad_siembra;
		var trab_permanentes;
		var trab_temporales;
		var trab_cosecha;
		var cuerpos_agua;
		var agua_potable;
		var tiene_bodega;
		var tiene_oficina;
		var tiene_viviendas;
//		var tipo_cuerpo_agua;
		var fotografia;
		var actividad_realizada;
		var actividad_pendiente;
		var actividad_anulada;
		var metrica_realizada;
		var metrica_pendiente;
		var metrica_anulada;
		var celular;
		var email;



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


function visualizaDatos(){
    //leer archivo productores y llenar campos
    db = window.openDatabase("PromotorDirectoryDB", "1.0", "PhoneGap Demo", 2000);
 	db.transaction(visualizaCampos, transaction_error );

}

function visualizaCampos(tx){

	var sql = "select * " 
		+ "  from Fincas where finca = :id" ; 
   //alert(sql); 
     tx.executeSql(sql, [id], visualizaCampos_success);

}

function recuperaCampos(){
		 idfinca = Productor1.finca;
		 nombre = Productor1.nombre;
		 direccion = Productor1.direccion;
		
		 telefono =  Productor1.telefono;
		 pais = Productor1.pais;
		 depto = Productor1.depto;
		 ciudad = Productor1.ciudad;
	
		 latitud = Productor1.latitud;
		 longitud = Productor1.longitud;
		 area_total = Productor1.area_total;
		 area_cultivada =  Productor1.area_cultivada;
		 cosecha_promedio =  Productor1.cosecha_promedio;
		 fecha_inicio_cosecha = Productor1.fecha_inicio_cosecha;
		 lotes =  Productor1.lotes;
		 area_otros_cultivos = Productor1.area_otros_cultivos;
		 area_conservacion =  Productor1.area_conservacion;
		 densidad_siembra =  Productor1.densidad_siembra;
		 trab_permanentes = Productor1.trab_permanentes;
		 trab_temporales =  Productor1.trab_temporales;
		 trab_cosecha =  Productor1.cosecha;
		 cuerpos_agua =  Productor1.cuerpos_agua;
		 agua_potable =  Productor1.agua_potable;
		 tiene_bodega =  Productor1.tiene_bodega;
		 tiene_oficina =  Productor1.tiene_oficina;
		 tiene_viviendas =  Productor1.tiene_viviendas;
/*		var tipo_cuerpo_agua = =  Productor1.tipo_cuerpo_agua;
*/		 fotografia =  Productor1.fotografia;
		 actividad_realizada = Productor1.actividad_realizada;
		 actividad_pendiente = Productor1.actividad_pendiente;
		 actividad_anulada =  Productor1.actividad_anulada;
		 metrica_realizada =  Productor1.metrica_realizada;
		 metrica_pendiente =  Productor1.metrica_pendiente;
		 metrica_anulada =  Productor1.metrica_anulada;
		 celular =  Productor1.celular;
		 email = Productor1.email;
}

function recuperaCamposTemp(){
		idfinca = document.getElementById("idfinca").value ;
		nombre  = document.getElementById("nombre").value;
		direccion = document.getElementById("direccion").value;
		telefono = document.getElementById("telefono").value;
		email = document.getElementById("email").value;		
/*		document.getElementById("latitud").value = latitud;
		document.getElementById("longitud").value = longitud;
		document.getElementById("area_total").value = area_total;
		document.getElementById("area_cultivada").value      = area_cultivada;
		document.getElementById("area_otros_cultivos").value = area_otros_cultivos;
		document.getElementById("area_conservacion").value   = area_conservacion;
		document.getElementById("densidad_siembra").value    = densidad_siembra;
		document.getElementById("trab_permanentes").value    = trab_permanentes;
		document.getElementById("trab_temporales").value     = trab_temporales;
		document.getElementById("trab_cosecha").value        = trab_cosecha;
		document.getElementById("cuerpos_agua").value        = cuerpos_agua;
		document.getElementById("agua_potable").value        = agua_potable;
		document.getElementById("tiene_bodega").value        = tiene_bodega;
		document.getElementById("tiene_oficina").value       = tiene_oficina;
		document.getElementById("tiene_viviendas").value     = tiene_viviendas;
		document.getElementById("tipo_cuerpo_agua").value    = tipo_cuerpo_agua;
		document.getElementById("fotografia").value          = fotografia;
		document.getElementById("actividad_realizada").value = actividad_realizada;
		document.getElementById("actividad_pendiente").value = actividad_pendiente;
		document.getElementById("actividad_anulada").value   = actividad_anulada;
		document.getElementById("metrica_realizada").value   = metrica_realizada;
		document.getElementById("metrica_pendiente").value   = metrica_pendiente;
		document.getElementById("metrica_anulada").value     = metrica_anulada;

		document.getElementById("celuar").value              = celular;

		document.getElementById("tipo_variedad").value       = tipo_variedad;
				*/
}


function visualizaCampos_success(tx, results){
    var len = results.rows.length;
    var i=0;
    //for (var i=0; i<len; i++) {
    	Productor1 = results.rows.item(i);
		recuperaCampos();
		
		document.getElementById("idfinca").value = idfinca;
		document.getElementById("nombre").value = nombre;
		document.getElementById("direccion").value = direccion;
		document.getElementById("telefono").value = telefono;
		document.getElementById("email").value               = email;		
/*		document.getElementById("latitud").value = latitud;
		document.getElementById("longitud").value = longitud;
		document.getElementById("area_total").value = area_total;
		document.getElementById("area_cultivada").value      = area_cultivada;
		document.getElementById("area_otros_cultivos").value = area_otros_cultivos;
		document.getElementById("area_conservacion").value   = area_conservacion;
		document.getElementById("densidad_siembra").value    = densidad_siembra;
		document.getElementById("trab_permanentes").value    = trab_permanentes;
		document.getElementById("trab_temporales").value     = trab_temporales;
		document.getElementById("trab_cosecha").value        = trab_cosecha;
		document.getElementById("cuerpos_agua").value        = cuerpos_agua;
		document.getElementById("agua_potable").value        = agua_potable;
		document.getElementById("tiene_bodega").value        = tiene_bodega;
		document.getElementById("tiene_oficina").value       = tiene_oficina;
		document.getElementById("tiene_viviendas").value     = tiene_viviendas;
		document.getElementById("tipo_cuerpo_agua").value    = tipo_cuerpo_agua;
		document.getElementById("fotografia").value          = fotografia;
		document.getElementById("actividad_realizada").value = actividad_realizada;
		document.getElementById("actividad_pendiente").value = actividad_pendiente;
		document.getElementById("actividad_anulada").value   = actividad_anulada;
		document.getElementById("metrica_realizada").value   = metrica_realizada;
		document.getElementById("metrica_pendiente").value   = metrica_pendiente;
		document.getElementById("metrica_anulada").value     = metrica_anulada;

		document.getElementById("celuar").value              = celular;

		document.getElementById("tipo_variedad").value       = tipo_variedad;
				

*/
		ubicacion(tx, pais, depto, ciudad);

}

function transaction_error(){}




function ubicacion(tx,pais, depto, ciudad){
	var sql = "select " 
		 + " nombre" 
		 + " from paises where pais = :pais" ;

     tx.executeSql(sql, [pais], 
		function (tx, results){  
			var paises = results.rows.item(0);
			document.getElementById("pais").value = paises.nombre;
		} );	
		ndepto(tx,pais, depto, ciudad);
}
function ndepto(tx,pais, depto, ciudad){

		var sql = "select " 
				+ "nombre" 
				+ " from departamentos where pais = :pais and depto = :depto" ;     		
		tx.executeSql(sql, [pais,depto],
				function (tx, results){  
					var deptos = results.rows.item(0);
					document.getElementById("departamento").value = deptos.nombre;
		} );
		nciudad(tx,pais, depto, ciudad);
}

function nciudad(tx,pais, depto, ciudad){

			var sql = "select " 
							+ "nombre" 
							+ " from ciudades where pais = :pais and depto = :depto and ciudad = :ciudad" ; 
//alert(sql);							
			tx.executeSql(sql, [pais,depto,ciudad],
				function (tx, results){  
					var ciudades = results.rows.item(0);
					
					document.getElementById("municipio").value =  ciudades.nombre;});
}


function actualizaDatos(){
    //alert('Grabando Localmente');
	
	db = window.openDatabase("PromotorDirectoryDB", "1.0", "PhoneGap Demo", 2000);
 	db.transaction(grabaCampos, transaction_error );

}

function grabaCampos(tx){
    recuperaCamposTemp();
	var sql = "update Fincas set " 
		+ " nombre = :nombre  "
		+ "  where finca = :id" ; 
   alert(nombre); 
     tx.executeSql(sql, [id,nombre],grabado,falla);
}
function grabado(){alert('ok');}
function falla(){alert('falla');}

var id = getUrlVars()["id"];
var np = getUrlVars()["np"];
//alert(window.location.href);
visualizaDatos();
