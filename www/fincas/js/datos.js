

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

	var sql = "select " +
		"idproductor, " + "fotografia," + "nombre," + 
		"pais," + "departamento," +  "municipio," + 
		"direccion," + "telefono," + "email," + 
		"fechaNacimiento," + "identificacion," + "nit," + 
		"famMenorEdad," + "famMayorEdad," + "actividad1," + 
		"actividad2," + "actividad3"
		+ " from productor where idproductor = :id" ; 
    
     tx.executeSql(sql, [id], visualizaCampos_success);
}

function visualizaCampos_success(tx, results){
//alert(results);
    var len = results.rows.length;

    for (var i=0; i<len; i++) {
    	var Productor1 = results.rows.item(i);
		var idProductor = Productor1.Productor;
		var nombre = Productor1.nombre;
		var direccion = Productor1.direccion;
		var telefono =  Productor1.telefono;
		var fechaNacimiento = Productor1.fechaNacimiento;
		var email = Productor1.email;
		var pais = Productor1.pais;
		var depto = Productor1.departamento;
		var ciudad = Productor1.municipio;

		document.getElementById("nombre").value = nombre;
		document.getElementById("direccion").value = direccion;
		document.getElementById("telefono").value = telefono;
		document.getElementById("fechaNacimiento").value = fechaNacimiento;
		ubicacion(tx,pais, depto, ciudad);
		document.getElementById("correo").value = email;
		}

}
function transaction_error(){}




function ubicacion(tx,pais, depto, ciudad){
	var sql = "select " 
		 + "nombre" 
		 + " from paises where pais = :pais" ; 
     tx.executeSql(sql, [pais], 
		function (tx, results){  
			var paises = results.rows.item(0);
			document.getElementById("paiscombo").value = paises.nombre;
		} );	
		ndepto(tx,pais, depto, ciudad);
}
function ndepto(tx,pais, depto, ciudad){
	/*alert('deptos');
	var sql = "select " 
		 + "nombre, depto " 
		 + "from departamentos where pais = :pais order by nombre" ; 
     tx.executeSql(sql, [pais], 
		function (tx, results){  
			
		
			for(var i = 0; i < results.rows.length; i++)
				{
					var deptos = results.rows.item(i);
					if(depto==deptos.depto){$("#deptoscombo").append("<option value='"+deptos.depto.toString() +"' selected>" + deptos.nombre+ "</option>");} 
					else 
					{$("#deptoscombo").append("<option value='"+deptos.depto.toString() +"'>" + deptos.nombre+ "</option>");}
				}
			} );*/
	
	
	
		var sql = "select " 
				+ "nombre" 
				+ " from departamentos where pais = :pais and depto = :depto" ;     
		tx.executeSql(sql, [pais,depto],
				function (tx, results){  
					var deptos = results.rows.item(0);
					document.getElementById("deptoscombo").value = deptos.nombre;
		} );
		nciudad(tx,pais, depto, ciudad);
}

function nciudad(tx,pais, depto, ciudad){

			var sql = "select " 
							+ "nombre" 
							+ " from ciudades where pais = :pais and depto = :depto and ciudad = :ciudad" ; 
			tx.executeSql(sql, [pais,depto,ciudad],

			function (tx, results){  
					var ciudades = results.rows.item(0);
					
					document.getElementById("ciudad").value =  ciudades.nombre;});
/*
			tx.executeSql(sql, [], 
					function (tx, results){  
					alert('leyendo');	
						for(var i = 0; i < results.rows.length; i++)
							{
								var ciudades = results.rows.item(i);					
								if(ciudad==ciudades.ciudad){$("#ciudadcombo").append("<option value='"+ciudades.ciudad.toString() +"' selected>" + ciudades.nombre+ "</option>"); var pais=ciudades.pais; var depto=ciudades.depto;} else 
								{$("#ciudadcombo").append("<option value='"+ciudades.ciudad.toString() +"'>" + ciudades.nombre+ "</option>");}
								}
						} );	

*/
}




function modificar(){
    window.location = 'modificar.html?id='+id+'&np='+np;
}
function cancelar(){
    window.location = 'index.html?id='+id+'&np='+np;
}
function eliminar(){
    window.location = 'index.html?id='+id+'&np='+np;
}
function grabar(){
alert('grabar');
	db = window.openDatabase("PromotorDirectoryDB", "1.0", "PhoneGap Demo", 1000);
 	db.transaction(grabardatos);
}
var filtro1;
var id3;
function grabardatos(tx){
        var filtro = " verifica='0'"; 
		filtro = "";
		filtro1 = "";
		if(document.getElementById("nombre").value.length>0){
				filtro = filtro + " nombre='" + document.getElementById("nombre").value + "'";
				filtro1 = filtro1 + " firstname='" + document.getElementById("nombre").value + "'";
				}
		if(document.getElementById("direccion").value.length>0){
				filtro = filtro + ", direccion = '" + document.getElementById("direccion").value + "'";
				filtro1 = filtro1 + ", address = '" + document.getElementById("direccion").value + "'";
				}
		if(document.getElementById("telefono").value.length>0){
				filtro = filtro + ", telefono = '" + document.getElementById("telefono").value + "'";
				filtro1 = filtro1 + ", cellPhone = '" + document.getElementById("telefono").value + "'";
				}
		if(document.getElementById("correo").value.length>0){
				filtro = filtro + ", correo= '" + document.getElementById("correo").value + "'";
				filtro1 = filtro1 + ", email= '" + document.getElementById("correo").value + "'";
				}		
		//if(document.getElementById("fechaNacimiento").value.length>0){}
		if(document.getElementById("paiscombo").value.length>0){
				filtro = filtro + ", pais='" + document.getElementById("paiscombo").value + "'";
				filtro1 = filtro1 + ", country='" + document.getElementById("paiscombo").value + "'";
				}
		if(document.getElementById("deptoscombo").value.length>0){filtro = filtro + ", departamento=" + document.getElementById("deptoscombo").value;}
		if(document.getElementById("ciudadcombo").value.length>0){filtro = filtro + ", municipio=" + document.getElementById("ciudadcombo").value;}
if (np == 0 ){ 
	alert('nuevo productor');
	 // se crea codigo temporal    
	 var id2 = Math.floor((Math.random()*100000));
     id3 = id2.toString();
	 var sql1= "insert into productor(idproductor,verifica, promotor) values ("
	            +id3+ ",'1'," + id.toString() + ")";
	 tx.executeSql(sql1, [], function(tx, results){var sql = "update productor set " + filtro + " where idproductor = " + id3 +""; 
	 tx.executeSql(sql, [], grabados2, erroresalgrabar);
	 }
	 , erroresalgrabar);
} else {
	var id2 = id;
	var sql = "update productor set " + filtro + " where idproductor = " + id2.toString() +"";
	tx.executeSql(sql, [], grabados, erroresalgrabar);	}
}
function grabados(tx, results){
	var sql = "select * from productor where idproductor = " + id.toString() +"";
    tx.executeSql(sql,[],verificando,erroresalgrabar); 
    if(np==0){ alert('Recuerde sincronizar en Web'); 
		 var sql1= "insert into Promotor(id, managerId) values ("
					+id3+ "," + id.toString() + ")";
					alert(sql1);
		 tx.executeSql(sql1, [], function(tx, results){var sql = "update Promotor set " + filtro1 + " where id = " + id3 +""; 
		 tx.executeSql(sql, [], grabados2, erroresalgrabar);
		 }
		 , erroresalgrabar);
	}else
	{ //actaliza menu	
	var sql = "update Promotor set " + filtro1 + " where id = " + id.toString() +""; 
	tx.executeSql(sql);} 

window.location = 'index.html?id='+id+'&np='+np;
}
function grabados2(tx, results){
	var sql = "select * from productor where promotor = " + id.toString() +"";
	alert(sql);
    tx.executeSql(sql,[],verificando,erroresalgrabar); 
    if(np==0){ alert('Pendiente de Confirmar en Web'); }else
	{ //actaliza menu	
	var sql = "update Promotor set " + filtro1 + " where id = " + id.toString() +""; 
	tx.executeSql(sql);} 

window.location = 'index.html?id='+id+'&np='+np;
}

function verificando(tx, results){ 
   var p = results.rows.item(0);
   alert(p.nombre);
  
 }

function erroresalgrabar(tx,error){alert(error);}

function agregar(){
    window.location = 'modificar.html?id='+id+'&np=0';
}
function buscar(){
    window.location = 'buscar.html';
}


function busca(){
alert('busqueda');
	db = window.openDatabase("PromotorDirectoryDB", "1.0", "PhoneGap Demo", 2000);
    db.transaction(leeTabla1, leeTabla1_error);

}
function leeTabla1_error(tx, error){ $('#DATOS_BUSCA').append('</table>'); }

	
function leeTabla1(tx){
        var filtro = '1=1';
		// crea filtro de los campos
		
		if(document.getElementById("nombre").value.length>0)
		{filtro = filtro + " and nombre like '%" + document.getElementById("nombre").value + "%'";}
		if(document.getElementById("direccion").value.length>0){filtro = filtro + " and direccion like '%" + document.getElementById("direccion").value + "%'";}
		if(document.getElementById("telefono").value.length>0){filtro = filtro + " and telefono like '%" + document.getElementById("telefono").value + "%'";}
		if(document.getElementById("correo").value.length>0){filtro = filtro + " and correo like '%" + document.getElementById("correo").value + "%'";}		
	//	if(document.getElementById("fechaNacimiento").value.length>0){}
	//	if(document.getElementById("paiscombo").value.length>0){filtro = filtro + " and pais=" + document.getElementById("paiscombo").value;}
	//	if(document.getElementById("deptoscombo").value.length>0){filtro = filtro + " and depto=" + document.getElementById("deptoscombo").value;}
	//	if(document.getElementById("ciudadcombo").value.length>0){filtro = filtro + " and ciudad=" + document.getElementById("ciudadcombo").value;}

alert(filtro);

$('#DATOS_BUSCA').html('');
	$('#DATOS_BUSCA').append('<table>');
	$('#DATOS_BUSCA').append("<tr style='background:#555;'>");
	$('#DATOS_BUSCA').append("<td width='100' style='background:#997;'><b>Productor</b></td>");
	$('#DATOS_BUSCA').append("<td width='300' style='background:#997;'><b>Nombre</b></td>");
	$('#DATOS_BUSCA').append("</tr>");
	
   var sql = "select " 
				+ " * " 
				+ " from productor where " + filtro ; 
		tx.executeSql(sql, [], leeTabla1_success); 
				
		}
		
function leeTabla1_success(tx, results){ 
 alert('encontro');
					var lproductor = results.rows.length;
				
					for(var i = 0; i < lproductor ; i++)
					{
                            var productores = results.rows.item(i);	
							$('#DATOS_BUSCA').append('<tr>');
							$('#DATOS_BUSCA').append('<td><h3><a name="../Promotordetails.html?id='+productores.idproductor.toString()+'&np=3"  onclick="ventana(name)" >'+productores.idproductor.toString()+'</a></h3></td>');
							$('#DATOS_BUSCA').append('<td><h3><a name="../Promotordetails.html?id='+productores.idproductor.toString()+'&np=3"  onclick="ventana(name)">'+productores.nombre+'</a></h3></td>');

//							$('#DATOS_BUSCA').append('<td><h3><a name="../Promotordetails.html?id='+productores.id.toString()+'&np=3"  onclick="ventana(name)" >'+productores.id.toString()+'</a></h3></td>');
//							$('#DATOS_BUSCA').append('<td><h3><a name="../Promotordetails.html?id='+productores.id.toString()+'&np=3"  onclick="ventana(name)">'+productores.firstName+' '+ productores.lastName+'</a></h3></td>');
							$('#DATOS_BUSCA').append('</tr>');		   		
						}
					$('#DATOS').append('</table>');
					
}


function ventana(name){
window.parent.window.parent.location=name;
}


var id = getUrlVars()["id"];
var np = getUrlVars()["np"];
//alert(window.location.href);
visualizaDatos();
