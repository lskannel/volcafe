var idc = getUrlVars()["idc"];
var managerID = getUrlVars()["managerID"];
var promotorID = getUrlVars()["prd"];
var np = getUrlVars()["np"];


function lee_preguntas(){
    db = window.openDatabase("PromotorDirectoryDB", "1.0", "PhoneGap Demo", 2000);
    db.transaction(ciclo_preguntas, pregunta_error);
}

function ciclo_preguntas(tx){
	var sql = 'select  * ' +
    'from respuestas where respuesta="2" and idencuesta="'+idc.toString()+'" and productor='+promotorID.toString()+' ';
//alert(sql);	
    tx.executeSql(sql,[], ciclo_preguntas_successs,pregunta_error);
}

function pregunta_error(tx, error){ alert("Error " + error); }

function ciclo_preguntas_successs(tx,results){
    var len = results.rows.length;
    var encabeza_grupo = '';
	//alert(len);
    for (var i=0; i<len; i++) {
       	var encuesta = results.rows.item(i); 
       	var j = i + 1;
       	
       	var p=encuesta.pregunta;
       	var vb=encuesta.plazo;
       	var vc=encuesta.correctiva;
       	var vd=encuesta.responsable;
       	var ve=encuesta.indicador;
        var vf=encuesta.cumplimiento;
       	var n = i;
       	var b='plazo';
       	var c='correctiva';
       	var d='responsable';
       	var e='indicador';
       	var f='cumplimiento';
       	
       	var xx=p.indexOf(']') + 1;
       	var a=p.substring(xx);
    	if( encabeza_grupo == p.substring(1,xx-1)){ } else {
    		encabeza_grupo = p.substring(1,xx-1);
    		$('#ingresa_ul').append('<li><h1  class="lineh">'+encabeza_grupo+'</h1></li>');
    	}
    	

       	visualiza_pregunta(a,b,c,d,e,f,vb,vc,vd,ve,vf,n);
    }
	
}



function visualiza_pregunta(a,b,c,d,e,f,vb,vc,vd,ve,vf,n){
        var tpregunta = a;
		$('#ingresa_ul').append('<li><h2>'+tpregunta+'</h2>'+
		'<li><p>Plazo Para Realizar:</br> <input type="date" style="width:95%;"  name="C'+b+n.toString()+'"  id="C'+b+n.toString()+'" value="'+vb+'"></p></li>'+
		'<li><p>Accion Correctiva:</br> <input type="text" style="width:95%;"  name="C'+c+n.toString()+'"  id="C'+c+n.toString()+'" value="'+vc+'"></p></li>'+
		'<li><p>Responsable Ejecutar:</br> <input type="text" style="width:95%;"  name="C'+d+n.toString()+'"  id="C'+d+n.toString()+'" value="'+vd+'"></p></li>'+
		'<li><p>Indicador que se realizo:</br> <input type="text" style="width:95%;"  name="C'+e+n.toString()+'"  id="C'+e+n.toString()+'" value="'+ve+'"></p></li>'+
		'<li><p>% actual de Cumplimiento:</br> <input type="tel" style="width:95%;"  name="C'+f+n.toString()+'"  id="C'+f+n.toString()+'" value="'+vf+'"></p></li>');
		
}





//******** graba respuestas

function grabar_respuestas(){
    db = window.openDatabase("PromotorDirectoryDB", "1.0", "PhoneGap Demo", 2000);
    db.transaction(ciclo_respuestas, pregunta_error);
}

function ciclo_respuestas(tx){
	var sql = 'select  * ' +
    'from respuestas where respuesta="2" and idencuesta = "'+idc.toString()+'" and productor='+promotorID.toString()+'  order by id';
    tx.executeSql(sql,[], ciclo_respuestas_successs);
}


function ciclo_respuestas_successs(tx,results){
    var len = results.rows.length;
    for (var i=0; i<len; i++) {
       	var respuestas = results.rows.item(i); 
       	var idpregunta = respuestas.id;
       	var n = i;
       	var j = i + 1;
       	//alert(n.toString());
       	var vb=document.getElementsByName('Cplazo'+n.toString())[0].value;
       	var vc=document.getElementsByName('Ccorrectiva'+n.toString())[0].value;
       	var vd=document.getElementsByName('Cresponsable'+n.toString())[0].value;
       	var ve=document.getElementsByName('Cindicador'+n.toString())[0].value;
       	var vf=document.getElementsByName('Ccumplimiento'+n.toString())[0].value;
       	
    	var sql = 'update respuestas set ' +
        'plazo="'+vb+'",correctiva="'+vc+'",responsable="'+vd+'",indicador="'+ve+'",cumplimiento="'+vf+
        '" where idencuesta="'+idc.toString()+'" and productor='+promotorID.toString()+' and id='+idpregunta;
    	//alert(sql);
        tx.executeSql(sql);
        
    }
	$('#busy').hide();
	regresa();
}


// ******************  DEFAULT  *************
lee_preguntas();
