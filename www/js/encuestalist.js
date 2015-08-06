
var scroll = new iScroll('wrapper', { vScrollbar: true, hScrollbar:false, hScroll: false });
var idc = getUrlVars()["idc"];
var managerID = getUrlVars()["managerID"];
var promotorID = getUrlVars()["prd"];
var pathDirectorItem="pics/";
var sql_tabla;
var id_transaccion;
var np = getUrlVars()["np"];
//var titulo = getUrlVars()["tit"];
//alert(titulo);
//          $('#ingresa_ul').append('<li><h1  class="lineh">Encuesta '+idc+'<input type="hidden" name="managerID" value="'+managerID.toString()+'" disabled><input type="hidden" name="id" value="'+promotorID.toString()+'" disabled></h1><li>');

setTimeout(onDeviceReadyList,2000);


function onDeviceReadyList() {
	var pathDirectorItem=pathDirector;
	//alert(pathDirectorItem);
    db = window.openDatabase("PromotorDirectoryDB", "1.0", "PhoneGap Demo", 2000);
    db.transaction(getReportEncuestaList, transaction_errorList);
}

function transaction_errorList(tx, error) {
	$('#busy').hide();
    alert("Error Base Datos: " + error);
}

function getReportEncuestaList(tx) {
	$('#busy').show();
	$('#busy').append('*');
	var sql = "select  * " +
		"from encuesta e  " +
		"where e.idencuesta=:idc order by e.idpregunta";
	tx.executeSql(sql, [idc], getReportEncuestaList_success);
}

function doItem(){
	//var pathDirectorItem='img';
    var fileName2 = pathDirectorItem + '' + fileName;
    //alert(fileName2);
	$('#encuestaList').append('<li>'+ fileName2+'<iframe src="'+ fileName2+'" ></iframe></li>');
}

function getReportEncuestaList_success(tx, results) {
    //alert(results);
	//alert(titulo);
    var len = results.rows.length;
    $('#header3').append('<h1>'+titulo+'</h1>');
    if (len>0){
        var encuesta = results.rows.item(0);
        sql_tabla = encuesta.sql_tabla;
        idtransaccion =  encuesta.id_transaccion;
        //alert(sql_tabla);
    }
    var encabeza_grupo = "";
    for (var i=0; i<len; i++) {
	//for (var i=0; i<4; i++) {
    	var encuesta = results.rows.item(i); var j = i + 1;
    	var tipo2 = encuesta.tipo1;
    	var idp=encuesta.idpregunta.toString();
    	var op=encuesta.orden_pregunta.toString();
    	var xx=encuesta.pregunta.indexOf(']') + 1;
    	if( encabeza_grupo == encuesta.pregunta.substring(1,xx-1)){ } else {
    		encabeza_grupo = encuesta.pregunta.substring(1,xx-1);
    		$('#ingresa_ul').append('<li><h1  class="lineh">'+encabeza_grupo+'</h1></li>');
    	}
//    	var name = 'C'+ encuesta.campo + '';
//		alert(name);
		var name = 'C'+encuesta.idencuesta + encuesta.idpregunta.toString();
		//alert(name);

    	//var pathDirectorItem='img';
    	if(tipo2 !== "Radio"){

    	   $('#ingresa_ul').append('<li>' + '<input type="hidden" name="T_'+ name + '" value="'+encuesta.pregunta+'">' 
    			                          + '<input type="hidden" name="idc" value="'+idc+'">' 
    			                          + '<input type="hidden" name="prd" value="'+promotorID+'">'
    			                          + '<input type="hidden" name="idp'+ name + '" value="'+idp+'">' 
					                       + '<input type="hidden" name="CmanagerID" value="'+managerID+'">'
    			                          + '<input type="hidden" name="op'+ name + '" value="'+op+'">'  +
				'<minimo>' +  j.toString() +'</minimo><a style="text-align:justify"   name="'+encuesta.ayuda+'" onclick="alert(name)") > <h3x>'+ encuesta.pregunta.substring(xx) + '</h3x></a><p>' +
				'<input class="'+ tipo2 + '" type="'+ tipo2 + '" id="C'+ name + '" name="'+ name + '" style="width:95%;" ></p></li>');    	   
    		}
    	else
    		{
//alert(encuesta.ayuda);    		    
    			$('#ingresa_ul').append('<li>' + '<input type="hidden" name="T_'+ name + '" value="'+encuesta.pregunta+'" >' 
    					                       + '<input type="hidden" name="idc" value="'+idc+'">' 
    					                       + '<input type="hidden" name="prd" value="'+promotorID+'">' 
    					                       + '<input type="hidden" name="idp'+ name + '" value="'+idp+'">'
    					                       + '<input type="hidden" name="CmanagerID" value="'+managerID+'">'
    					                       + '<input type="hidden" name="op'+ name + '" value="'+op+'">' +
   				'<minimo>' +  encuesta.id_transaccion +'</minimo><a style="text-align:justify"  title="'+encuesta.ayuda+'" onclick="alert(name)"  name="'+encuesta.ayuda+'" onclick="alert(name)" style="width:95%;"><h3x>'+ encuesta.pregunta.substring(xx) + '</h3x></a><input type="hidden" id="C'+ name + '" name="'+ name + '"  ><li>' +
   				'<li ><table border=0><tr>'+
   				'<td width=250px><label  class="line1" for="C'+ name + '1"  ><img src="' +pathDirectorItem +encuesta.dibujo1+'" alt="'+encuesta.respuesta1+'" class="action-icon4" name="'+name+'" onclick="click1(name)"></br><input type="radio" value = "1" id="C'+ name + '1" name="'+ name + '"  onclick="click1(name)"> '+encuesta.respuesta1+'</label></td>'+
   				'<td width=250px><label  class="line1" for="C'+ name + '2"  ><img src="' +pathDirectorItem +encuesta.dibujo2+'" alt="'+encuesta.respuesta2+'" class="action-icon4" name="'+name+'" onclick="click2(name)"></br><input type="radio" value = "2" id="C'+ name + '2" name="'+ name + '"  onclick="click2(name)"> '+encuesta.respuesta2+'</label></td>'+
   				'<td width=250px><label  class="line1" for="C'+ name + '3"  ><img src="' +pathDirectorItem +encuesta.dibujo3+'" alt="'+encuesta.respuesta3+'" class="action-icon4" name="'+name+'" onclick="click3(name)"></br><input type="radio" value = "3" id="C'+ name + '3" name="'+ name + '"  onclick="click3(name)"> '+encuesta.respuesta3+'</label></td></tr></table>'+
				'<div id="div'+name+'" >'+
				'<h3>Acciones correctivas plan de accion</h3>'+
				'<table>'+
				'<tr><td>Fecha de plazo:</td><td><input type="date" name="AC1'+name+'"> '+'</td></tr>'+
				'<tr><td>Accion Correctiva:</td><td><input type="text" name="AC2'+name+'" value="'+encuesta.accion_correctiva+'">'+'</td></tr> '+
				'<tr><td>Responsable Ejecutar:</td><td><input type="text" name="AC3'+name+'">'+'</td></tr>'+
				'<tr><td>% actual de Cumplimiento:</td><td><input type="number" name="AC4'+name+'">'+ '</td></tr>'+
				'</table>'+
				'<button type="button" name="'+name+'" onclick="click4(name);" >Ocultar</button>'+
				'</div></li>');
				$('#div'+name).hide();
				
				
    		}
	}
    $('#ingresa_ul').append('<li>.</li>');
	$('#ingresa_ul').append('<li><button class="button" onclick="grabar_sql();">Grabar</button></li>');
	$('#ingresa_ul').append('<li>.</li>');
    $('#busy').hide();
    
	setTimeout(function(){
		scroll.refresh();
	});
}


function click1(name){ document.getElementsByName(name)[0].value = 1; }
function click2(name){ document.getElementsByName(name)[0].value = 2;  $('#div'+name).show();}
function click3(name){ document.getElementsByName(name)[0].value = 3; }
function click4(name){ $('#div'+name).hide();}

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

function grabar_sql(){
	
	//alert("ID=" + idtransaccion + " --- sqltabla = " + sql_tabla);
	//local
    db = window.openDatabase("PromotorDirectoryDB", "1.0", "PhoneGap Demo", 2000);
    //db.transaction(grabacambio, grabacambio_error, regresa);
	db.transaction(grabacambio, grabacambio_error, cancela);
	
}

function grabaerror(){
	alert("error al grabar");
}

function grabacambio(tx){
//	alert("graba cambio BD local, encuesta " + idc);
	var sql = "select  * " +
	          "from encuesta where idencuesta= :idc";
    tx.executeSql(sql, [idc], grabacambios_successs);
}

function grabacambios_successs(tx,results){
//*********************************  revisar	

	    var len = results.rows.length;
		//alert(len);

		if (len>0){
		        var encuesta = results.rows.item(0);
		        sql_tabla = encuesta.sql_tabla;
		        idtransaccion =  encuesta.id_transaccion;
		    }
		
for (var i=0; i< 3; i++) {
   	var encuesta = results.rows.item(i); var j = i + 1;
   	//var NC = encuesta.campo;
	var NC = 'C'+encuesta.idencuesta + encuesta.idpregunta.toString();
	//alert(NC);
	//sql_tabla = encuesta.sql_tabla;
	//alert(sql_tabla);
	var V0 = document.getElementsByName(NC)[0].value;
	var V1 = document.getElementsByName('T_'+NC)[0].value;
	var V2 = document.getElementsByName('op'+NC)[0].value;
	var V3 = document.getElementsByName('idp'+NC)[0].value;
	var AC1 = document.getElementsByName('AC1'+NC)[0].value;
	var AC2 = document.getElementsByName('AC2'+NC)[0].value;
	var AC3 = document.getElementsByName('AC3'+NC)[0].value;
	var AC4 = document.getElementsByName('AC4'+NC)[0].value;
	
	
	sql_tabla = 'insert into respuestas (idencuesta, productor, pregunta, plazo,  correctiva, responsable, cumplimiento, orden_pregunta, idpregunta, respuesta) ' + 
	            ' values ("'+idc+'",:prd,"'+ V1  +'","'+AC1 +'","'+AC2+'","'+AC3+'","'+AC4+'","'+V2+'",'+V3+', "'+V0+'" )';
   //alert(sql_tabla);
   //	var campoV = document.getElementsByName('C'+encuesta.campo)[0].value;
   	
    //alert(campoV);
	var sql = sql_tabla;
	 while ( sql.indexOf(":") > 0) {
	    var pos1 = sql.indexOf(":");
		//alert(pos1);
	    if(pos1>0){
	    	var pos2 = sql.indexOf(",",pos1);
	    	if(pos2<0){pos2=sql.indexOf(")",pos1);}
	    	var campoR = sql.substr(pos1+1,pos2-pos1-1);
			//alert(campoR);
	    	var campoV = document.getElementsByName(campoR)[0].value;
			//alert(campoV);
	    	var sql1 = sql.replace(':'+campoR,''+ campoV +'');
			sql = sql1;
			//alert(sql);
			};
	 }
	 //alert('sql='+sql);
	
	/*	 while ( sql.indexOf("!") > 0) {
			    var pos1 = sql.indexOf("!");
			    //alert(pos1);
			    if(pos1>0){
			    	var pos2 = sql.indexOf(",",pos1);
			    	if(pos2<0){pos2=sql.indexOf(")",pos1);}
			    	//alert(pos2);
			    	var campoR = sql.substr(pos1+1,pos2-pos1-1);
			    	//alert(campoR);
			    	var campoV = getUrlVars()[campoR];
			    	//alert(campoV);
			    	var sql1 = sql.replace('!'+campoR,'"'+ campoV +'"');			    	
					sql = sql1;
					}
		 }
*/		 
	// SE GUARDAN LAS RESPUESTAS
    //alert("ID=" + idtransaccion + " --- sqltabla = " + sql_tabla);
	tx.executeSql(sql,[],grabacambio_success,grabacambio_error);	 
	//sqltablaremoto =  sql;
	}
}


function grabacambio_success(){
//	alert("grabado");
}

function grabacambio_error(tx,error){
	alert("Error en: " + error);
	}



