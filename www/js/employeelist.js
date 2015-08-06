

//var scroll = new iScroll('wrapper', { vScrollbar: false, hScrollbar:false, hScroll: false });

setTimeout(onDeviceReady,3000);
function onDeviceReady() {

   db = window.openDatabase("PromotorDirectoryDB", "1.0", "PhoneGap Demo", 2000);
   db.transaction(populateDB, transaction_error, populateDB_success);

}

function transaction_error(tx, error) {
	$('#busy').append(" ERROR :" + error);
}

function populateDB_success() {
	$('#busy').show();
	$('#busy').append(" 1");
	dbCreated = true;
    db.transaction(actualizaDB,transaction_error);
}

function getPromotors(tx) {
	$('#busy').append("0");
	var sql = "select e.id, e.nivel, e.firstName, e.lastName, e.title, e.picture, count(r.id) reportCount " + 
				"from Promotor e left join Promotor r on r.managerId = e.id " + // " where  e.id = " + id.toString() +  
				" group by e.id order by e.nivel,  e.firstName ";
	//alert(sql);
	tx.executeSql(sql, [], getPromotors_success, getPromotorsError);
}

function getPromotorsError(tx,error){
	var errorPromotor = 1;
	alert(error);
};
function getPromotors_success(tx, results) {
	$('#busy').append('x');
    var len = results.rows.length;
    alert(len);
    for (var i=0; i<len; i++) {
    	var Promotor = results.rows.item(i);
		$('#PromotorList').append('<li><a href="Promotordetails.html?id=' + Promotor.id + '&np=' + nivel_permiso + '">' +
				'<img src="'+ pathDirector +'' + Promotor.picture + '" class="list-icon" alt="'+ pathDirector +'' + Promotor.picture + '">' +
				'<p class="line3">' + Promotor.firstName + ' ' + Promotor.lastName + '</p>' +
				'<p class="line2">' + Promotor.title + ' ' + Promotor.id + '</p>' +
				'<span class="bubble">' + Promotor.reportCount + '</span></a></li>');
    }
	setTimeout(function(){
		scroll.refresh();
	},1000);
	$('#busy').hide();
}



function populateDB(tx) {
	$('#busy').show();
	$('#busy').append(' *');
//********************	
	//if (webservice)
	//{
//	$('#busy').append(' x');
    creaDB(tx);
	//}
}
    
function creaDB(tx)
{

	tx.executeSql('DROP TABLE IF EXISTS Promotor');
	var sql = 
		"CREATE TABLE IF NOT EXISTS Promotor ( "+
		"id INTEGER PRIMARY KEY, " +
		"firstName VARCHAR(50), " +
		"lastName VARCHAR(50), " +
		"title VARCHAR(50), " +
		"department VARCHAR(50), " + 
		"managerId INTEGER, " +
		"city VARCHAR(50), " +
		"officePhone VARCHAR(30), " + 
		"cellPhone VARCHAR(30), " +
		"email VARCHAR(50), " +
		"latitude float, " +
		"longitude float, " +
		"address     VARCHAR(100), "  +
		"encuesta    VARCHAR(10), "  +
		"formulario  VARCHAR(10), " +
		"formulario2 VARCHAR(10), " +
		"formulario3 VARCHAR(10), " +
		"formulario4 VARCHAR(10), " +
		"formulario5 VARCHAR(10), " +
		"metrica0101 float, " +
		"metrica0102 float, " +
		"metrica0103 float, " +
		"metrica0201 float, " +
		"metrica0202 float, " +
		"metrica0203 float, " +		
		"nivel integer, " +
		"esLocal VARCHAR(1), " +
		"picture VARCHAR(200))";
    tx.executeSql(sql);
  
	$('#busy').append('y');
	tx.executeSql('DROP TABLE IF EXISTS Fincas');
	var sql = "CREATE TABLE IF NOT EXISTS Fincas ( " +
		"finca LONG PRIMARY KEY, " +             //finca  ---> id
		"productor LONG, " +                  //productor   --->managerId
		"nombre VARCHAR(100), " +                //nombre
		"productor_interno VARCHAR(20), " +      //productor_interno
		"depto VARCHAR(20), " +                  //depto
		"ciudad VARCHAR(20), " +                 //ciudad
 		"telefono VARCHAR(20), " +               //telefono 
		"celular VARCHAR(20), " +                //celular
		"email VARCHAR(100), " +                 //email
		"latitud VARCHAR(20), " +                //latitud
		"longitud VARCHAR(20), " +               //longitud
		"direccion VARCHAR(100), "  +            //direccion
		"lotes VARCHAR(20), " +                  //lotes
		"area_total VARCHAR(20), " +             //area_total
		"area_cultivada VARCHAR(20), " +         //area_cultivada
		"area_otros_cultivo VARCHAR(20), " +     //area_otros_cultivos
		"area_conservacion VARCHAR(20), " +      //area_conservacion
		"densidad_siembra VARCHAR(20), " +       //densidad_siembra
		"pais VARCHAR(20), " +                   //pais
		"trab_permanentes VARCHAR(20), " +       //trab_permanentes
		"trab_temporales VARCHAR(20), " +        //trab_temporales
		"trab_cosecha VARCHAR(20), " +           //trab_cosecha
		"cuerpos_agua VARCHAR(20), " +           //cuerpos_agua
		"tipo_cuerpo_agua VARCHAR(20)," +        //tipo_cuerpo_agua
		"agua_potable VARCHAR(10), " +           //agua_potable
		"tiene_bodega VARCHAR(20)," +            //tiene_bodega
		"tiene_oficina VARCHAR(20), " +          //tiene_oficina
		"tiene_viviendas VARCHAR(20), " +        //tiene_viviendas
		"actividad_realizada VARCHAR(20), " +    //actividad_realizada
		"actividad_pendiente VARCHAR(20), " +    //atividad_pendiente
		"actividad_anulada VARCHAR(20), " +      //actividad_anulada
		"metrica_realizada VARCHAR(20), " +      //metrica_realizada
		"metrica_pendiente VARCHAR(20), " +      //metrica_pendiente
		"metrica_anulada   VARCHAR(20), " +		 //metrica_anulada
		"cosecha_promedio     VARCHAR(20), " +   //cosecha_promedio
		"fecha_inicio_cosecha VARCHAR(20)," +    //fecha_inicio_cosecha
		"fotografia VARCHAR(200))";              //fotografia
   
	tx.executeSql(sql);
$('#busy').append('y');
	
	tx.executeSql('DROP TABLE IF EXISTS  productor');
	var sql = 
		"CREATE TABLE IF NOT EXISTS productor ( "+
		"idproductor long PRIMARY KEY, " +
		"promotor    long, " +
		"fotografia VARCHAR(150)," + 
		"nombre VARCHAR(150)," + 
		"pais VARCHAR(150)," + 
		"departamento VARCHAR(150)," + 
		"municipio VARCHAR(150)," + 
		"direccion VARCHAR(150)," + 
		"telefono VARCHAR(150)," + 
		"email VARCHAR(150)," + 
		"fechaNacimiento VARCHAR(15)," + 
		"identificacion VARCHAR(150)," + 
		"nit VARCHAR(50)," + 
		"famMenorEdad VARCHAR(10)," + 
		"famMayorEdad VARCHAR(10)," + 
		"actividad1 VARCHAR(50)," + 
		"actividad2 VARCHAR(50)," + 
		"actividad3 VARCHAR(50))"; 
    tx.executeSql(sql);
//$('#busy').append(sql);

	
	tx.executeSql('DROP TABLE IF EXISTS actividad');
	var sql = 
		"CREATE TABLE IF NOT EXISTS actividad ( "+
		"idactividad INTEGER, " +
		"nameactividad VARCHAR(50))"; 
    tx.executeSql(sql);

	
	tx.executeSql('DROP TABLE IF EXISTS paises');
	var sql = 
		"CREATE TABLE IF NOT EXISTS paises ( "+
		"pais INTEGER, " +
		"nombre VARCHAR(50))"; 
    tx.executeSql(sql);

    
    tx.executeSql('DROP TABLE IF EXISTS departamentos');
	var sql = 
		"CREATE TABLE IF NOT EXISTS departamentos ( "+
		"pais INTEGER, " +
		"depto INTEGER, " +
		"nombre VARCHAR(50))"; 
    tx.executeSql(sql);

	
	tx.executeSql('DROP TABLE IF EXISTS ciudades');
	var sql = 
		"CREATE TABLE IF NOT EXISTS ciudades ( "+
		"pais   INTEGER, " +
		"depto  INTEGER," +
		"ciudad INTEGER," +
		"nombre VARCHAR(50))"; 
    tx.executeSql(sql);


	
	tx.executeSql('DROP TABLE IF EXISTS encuesta');
	var sql = 
		"CREATE TABLE IF NOT EXISTS encuesta ( "+
		"id INTEGER PRIMARY KEY AUTOINCREMENT, " +
		"idencuesta VARCHAR(10), " +
		"idpregunta     integer," +
		"orden_pregunta integer," +
		"pregunta   VARCHAR(200)," +
		"respuesta1 VARCHAR(200)," +
		"respuesta2 VARCHAR(200)," +
		"respuesta3 VARCHAR(200)," +
		"tipo1 VARCHAR(10)," +
		"tipo2 VARCHAR(10)," +
		"tipo3 VARCHAR(10)," +
		"dibujo1 VARCHAR(10)," +
		"dibujo2 VARCHAR(10)," +
		"dibujo3 VARCHAR(10)," +
		"id_transaccion VARCHAR(45), " +
		"ayuda VARCHAR(1000), " +
		"campo VARCHAR(45), " +
		"sql_tabla VARCHAR(500), " +
		"respuesta_elegida  VARCHAR(200)," +
		"accion_correctiva  VARCHAR(100)" +
		")"; 
    tx.executeSql(sql);
	
	
	tx.executeSql('DROP TABLE IF EXISTS respuestas');
	var sql = 
		"CREATE TABLE IF NOT EXISTS respuestas ( "+
		"id INTEGER PRIMARY KEY AUTOINCREMENT, " +
		"idpregunta     integer," +
		"idencuesta     VARCHAR(10), " +
		"productor      INTEGER, " +
		"orden_pregunta INTEGER," +
		"pregunta       VARCHAR(200)," +
		"plazo          DATE," +
		"correctiva     VARCHAR(200)," +
		"responsable    VARCHAR(200)," +
		"indicador      VARCHAR(200)," +
		"campo          VARCHAR(45), " +
		"grupo          VARCHAR(50), " +
		"fecha          DATE, "        +
		"formulario     INTEGER, " +
		"cumplimiento   VARCHAR(20), " +
		"respuesta      VARCHAR(50), "  +
		"id_transaccion VARCHAR(45), " +
		"verificada     VARCHAR(1)" +
		")"; 
    tx.executeSql(sql);
	$('#busy').append('z');
}

/*
var sql= "CREATE TABLE Q_RESPUESTA" +
"( "+ 
"   EMPRESA             VARCHAR(6),"+    //21
"   FORMULARIO          VARCHAR(6),"+    //idencuesta
"   GRUPO               VARCHAR(4),  "+   //grupo
"   ENCUESTA            VARCHAR(8),  "+  //................. falta
"   PREGUNTA            VARCHAR(4),  "+  //orden_pregunta
"   OPCION              VARCHAR(4),"+    //respuesta
"   VALOR_TXT           VARCHAR(200),"+   //no se usa
"   VALOR_NUM           VARCHAR(15,2)," + //no se usa
"   VALOR_FECHA         DATE," +          //no se usa
"   ACCION_CORRECTIVA   VARCHAR(200)," +  //correctiva
"   ACCION_FECHA        DATE," +          //plazo
"   ACCION_RESPONSABLE  VARCHAR(30)," +   //responsable
"   ACCION_INDICADOR    VARCHAR(150)," +  //indicador
"   FECHA               DATE," +          //fecha
"   FECHA_PLAN          DATE, " +         //..................   falta
"   CORRELATIVO         VARCHAR(15), "+   //id
"   PLAN_ACCION         VARCHAR(2) , "+   //.............................. falta
"   ESTADO              VARCHAR(2) , "+   //verificada
"   LISTA_EDITABLE      VARCHAR(2) , "+   //no se usa
"   ACCION_FECHA_TEXTO  VARCHAR2(10 BYTE)"+  //no se usa
//  CUMPLIMIENTO      ...... % de cumplimiento
//  CAMPO             ...... nombre del campo equivalente en kannel
//
" )";
*/



function actualizaDB(tx)
{
	   $('#busy').append("2");
	    initFileManager();
	
}


function errorHandler(transaction, error)
{
    alert('Oops.  Error was '+error.message+' (Code '+error.code+')');
 
    var we_think_this_error_is_fatal = true;
    if (we_think_this_error_is_fatal) return true;
    return false;
}

function leeDB(tx){

	$('#busy').append('7');

	//if (webservice){
		cargaPais();
		cargaDepto();
		cargaCiudades(tx)
 	    cargaFincas(tx);
		cargaProductor(tx);
		cargaPromotor(tx);
		cargaEncuestas(tx);
	//}
}
function leeDB1(tx){
		cargaEncuestas(tx);
}
function leeDB8(tx){
		cargaFincas(tx);
}
function leeDB9(tx){
		cargaProductor(tx);
}
function leeDB3(tx){
		cargaPromotor(tx);
}

function cargaPais(tx){
	var xml = StringToXML(paisXML);
	var paises = xml.documentElement.getElementsByTagName("registro");
	var filter = "";
			
	for(var i = 0; i < paises.length ; i++){
	 	if ((paises[i].getElementsByTagName("PAIS")[0].firstChild))
	       {var pais = $.trim(paises[i].getElementsByTagName("PAIS")[0].firstChild.nodeValue);} else { var pais="";}
	 	if ((paises[i].getElementsByTagName("NOMBRE")[0].firstChild))
	       {var nombre = $.trim(paises[i].getElementsByTagName("NOMBRE")[0].firstChild.nodeValue);} else { var nombre="";}
		var sql = "insert into paises (pais,nombre"
		+ ") VALUES (" + pais + ",'" + nombre 
		+ "')";
		   tx.executeSql(sql);	   
		}
}
function cargaDepto(tx){

	var xml = StringToXML(deptosXML);
	var departamentos = xml.documentElement.getElementsByTagName("registro");
	var filter = "";
				
	for(var i = 0; i < departamentos.length ; i++){
	 	if ((departamentos[i].getElementsByTagName("PAIS")[0].firstChild))
	       {var pais = $.trim(departamentos[i].getElementsByTagName("PAIS")[0].firstChild.nodeValue);} else { var pais="";}
	 	if ((departamentos[i].getElementsByTagName("DEPTO")[0].firstChild))
	       {var depto = $.trim(departamentos[i].getElementsByTagName("DEPTO")[0].firstChild.nodeValue);} else { var depto="";}
	   if ((departamentos[i].getElementsByTagName("NOMBRE")[0].firstChild))
	       {var nombre = $.trim(departamentos[i].getElementsByTagName("NOMBRE")[0].firstChild.nodeValue);} else { var nombre="";}
		var sql = "insert into departamentos (pais,depto,nombre"
		+ ") VALUES (" + pais + "," + depto + ",'" + nombre 
		+ "')";
		   tx.executeSql(sql);	   
		}
	
}
function cargaCiudades(tx){

	var xml = StringToXML(ciudadesXML);
	var ciudades = xml.documentElement.getElementsByTagName("registro");
	var filter = "";
				
	for(var i = 0; i < ciudades.length ; i++){
	 	if ((ciudades[i].getElementsByTagName("PAIS")[0].firstChild))
	       {var pais = $.trim(ciudades[i].getElementsByTagName("PAIS")[0].firstChild.nodeValue);} else { var pais="";}
	 	if ((ciudades[i].getElementsByTagName("DEPTO")[0].firstChild))
	       {var depto = $.trim(ciudades[i].getElementsByTagName("DEPTO")[0].firstChild.nodeValue);} else { var depto="";}
		if ((ciudades[i].getElementsByTagName("CIUDAD")[0].firstChild))
	       {var ciudad = $.trim(ciudades[i].getElementsByTagName("CIUDAD")[0].firstChild.nodeValue);} else { var ciudad="";}
	   if ((ciudades[i].getElementsByTagName("NOMBRE")[0].firstChild))
	       {var nombre = $.trim(ciudades[i].getElementsByTagName("NOMBRE")[0].firstChild.nodeValue);} else { var nombre="";}
		var sql = "insert into ciudades (pais,depto, ciudad, nombre"
		+ ") VALUES (" + pais + "," + depto + "," + ciudad + ",'" + nombre 
		+ "')";
		   tx.executeSql(sql);	   
		}
	
}


function cargaProductor(tx){

	var xml = StringToXML(productorXML);
	var productor = xml.documentElement.getElementsByTagName("registro");
	var filter = "";
//alert(productorXML);
	for(var i = 0; i < productor.length ; i++){
	 	if ((productor[i].getElementsByTagName("PRODUCTOR")[0].firstChild))
	       {var idproductor = $.trim(productor[i].getElementsByTagName("PRODUCTOR")[0].firstChild.nodeValue);} else { var idproductor="";}
	 	if ((productor[i].getElementsByTagName("EMAIL")[0].firstChild))
	       {var email = $.trim(productor[i].getElementsByTagName("EMAIL")[0].firstChild.nodeValue);} else { var email="";}
	 	if ((productor[i].getElementsByTagName("NOMBRE")[0].firstChild))
	       {var nombre = $.trim(productor[i].getElementsByTagName("NOMBRE")[0].firstChild.nodeValue);} else { var nombre="";}
	 	if ((productor[i].getElementsByTagName("DIRECCION")[0].firstChild))
	       {var direccion = $.trim(productor[i].getElementsByTagName("DIRECCION")[0].firstChild.nodeValue);} else { var direccion="";}
	 	if ((productor[i].getElementsByTagName("TELFONOS")[0].firstChild))
	       {var telefono = $.trim(productor[i].getElementsByTagName("TELFONOS")[0].firstChild.nodeValue);} else { var telefono="";}
	 	if ((productor[i].getElementsByTagName("FECHA_NACIMIENTO")[0].firstChild))
	       {var fechaNacimiento = $.trim(productor[i].getElementsByTagName("FECHA_NACIMIENTO")[0].firstChild.nodeValue);} else { var fechaNacimiento="NULL";}
	 	if ((productor[i].getElementsByTagName("NIT")[0].firstChild))
	       {var nit = $.trim(productor[i].getElementsByTagName("NIT")[0].firstChild.nodeValue);} else { var nit="";}
	 	if ((productor[i].getElementsByTagName("PAIS")[0].firstChild))
	       {var pais = $.trim(productor[i].getElementsByTagName("PAIS")[0].firstChild.nodeValue);} else { var pais="";}
	 	if ((productor[i].getElementsByTagName("DEPTO")[0].firstChild))
	       {var departamento = $.trim(productor[i].getElementsByTagName("DEPTO")[0].firstChild.nodeValue);} else { var departamento="";}
	 	if ((productor[i].getElementsByTagName("CIUDAD")[0].firstChild))
	       {var municipio = $.trim(productor[i].getElementsByTagName("CIUDAD")[0].firstChild.nodeValue);} else { var municipio="";}

		//var pais         = $.trim(productor[i].getElementsByTagName("pais")[0].firstChild.nodeValue);
		//var departamento = $.trim(productor[i].getElementsByTagName("departamento")[0].firstChild.nodeValue);
		//var municipio    = $.trim(productor[i].getElementsByTagName("municipio")[0].firstChild.nodeValue);
		//var identificacion   = $.trim(productor[i].getElementsByTagName("identificacion")[0].firstChild.nodeValue);
		//var famMenorEdad     = $.trim(productor[i].getElementsByTagName("famMenorEdad")[0].firstChild.nodeValue);
		//var famMayorEdad     = $.trim(productor[i].getElementsByTagName("famMayorEdad")[0].firstChild.nodeValue);

		var sql = "insert into productor (idproductor,nombre,direccion,telefono,email, fechaNacimiento, nit, pais, departamento, municipio"
		+ ") VALUES (" + idproductor + ",'" + nombre + "','" + direccion+ "','" + telefono
		+ "','" + email + "','" + fechaNacimiento + "','" + nit + "','" + pais + "','" + departamento + "','" + municipio + "')";

		tx.executeSql(sql);	   
		}
}

function cargaFincas(tx){

	var xml = StringToXML(fincaXML);
	var fincas = xml.documentElement.getElementsByTagName("registro");
	var filter = "";
//alert("carga fincas" + fincas);				
	for(var i = 0; i < fincas.length ; i++){
//	for(var i = 0; i < 3 ; i++){
	 	if ((fincas[i].getElementsByTagName("FINCA")[0].firstChild))
	       {var idfinca = $.trim(fincas[i].getElementsByTagName("FINCA")[0].firstChild.nodeValue);} else { var idfinca="";}
	 	if ((fincas[i].getElementsByTagName("PRODUCTOR")[0].firstChild))
	       {var idproductor = $.trim(fincas[i].getElementsByTagName("PRODUCTOR")[0].firstChild.nodeValue);} else { var idproductor="";}
	 	if ((fincas[i].getElementsByTagName("NOMBRE")[0].firstChild))
	       {var nombre = $.trim(fincas[i].getElementsByTagName("NOMBRE")[0].firstChild.nodeValue);} else { var nombre="";}
		 
		   
	 	if ((fincas[i].getElementsByTagName("DIRECCION")[0].firstChild))
	       {var direccion = $.trim(fincas[i].getElementsByTagName("DIRECCION")[0].firstChild.nodeValue);} else { var direccion="";}

		   if ((fincas[i].getElementsByTagName("PAIS")[0].firstChild))
	       {var pais = $.trim(fincas[i].getElementsByTagName("PAIS")[0].firstChild.nodeValue);} else { var pais="";}
	 	if ((fincas[i].getElementsByTagName("DEPTO")[0].firstChild))
	       {var depto = $.trim(fincas[i].getElementsByTagName("DEPTO")[0].firstChild.nodeValue);} else { var depto="";}
	 	if ((fincas[i].getElementsByTagName("CIUDAD")[0].firstChild))
	       {var ciudad = $.trim(fincas[i].getElementsByTagName("CIUDAD")[0].firstChild.nodeValue);} else { var ciudad="";}

	 	if ((fincas[i].getElementsByTagName("TELEFONO")[0].firstChild))
	       {var telefono = $.trim(fincas[i].getElementsByTagName("TELEFONO")[0].firstChild.nodeValue);} else { var telefono="";}
	 	if ((fincas[i].getElementsByTagName("CELULAR")[0].firstChild))
	       {var celular = $.trim(fincas[i].getElementsByTagName("CELULAR")[0].firstChild.nodeValue);} else { var celular="";}
	 	if ((fincas[i].getElementsByTagName("EMAIL")[0].firstChild))
	       {var email = $.trim(fincas[i].getElementsByTagName("EMAIL")[0].firstChild.nodeValue);} else { var email="";}

		   if ((fincas[i].getElementsByTagName("LATITUD")[0].firstChild))
	       {var latitud = $.trim(fincas[i].getElementsByTagName("LATITUD")[0].firstChild.nodeValue);} else { var latitud="";}
	 	if ((fincas[i].getElementsByTagName("LONGITUD")[0].firstChild))
	       {var longitud = $.trim(fincas[i].getElementsByTagName("LONGITUD")[0].firstChild.nodeValue);} else { var longitud="";}
	 	if ((fincas[i].getElementsByTagName("LOTES")[0].firstChild))
	       {var lotes = $.trim(fincas[i].getElementsByTagName("LOTES")[0].firstChild.nodeValue);} else { var lotes="";}

		   if ((fincas[i].getElementsByTagName("AREA_TOTAL")[0].firstChild))
	       {var area_total = $.trim(fincas[i].getElementsByTagName("AREA_TOTAL")[0].firstChild.nodeValue);} else { var area_total="";}
	 	if ((fincas[i].getElementsByTagName("AREA_CULTIVADA")[0].firstChild))
	       {var area_cultivada = $.trim(fincas[i].getElementsByTagName("AREA_CULTIVADA")[0].firstChild.nodeValue);} else { var area_cultivada="";}
	 	if ((fincas[i].getElementsByTagName("AREA_OTROS_CULTIVOS")[0].firstChild))
	       {var area_otros_cultivo = $.trim(fincas[i].getElementsByTagName("AREA_OTROS_CULTIVOS")[0].firstChild.nodeValue);} else { var area_otros_cultivo="";}
	 	if ((fincas[i].getElementsByTagName("AREA_CONSERVACION")[0].firstChild))
	       {var area_conservacion = $.trim(fincas[i].getElementsByTagName("AREA_CONSERVACION")[0].firstChild.nodeValue);} else { var area_conservacion="";}

		   if ((fincas[i].getElementsByTagName("DENSIDAD_SIEMBRA")[0].firstChild))
	       {var densidad_siembra = $.trim(fincas[i].getElementsByTagName("DENSIDAD_SIEMBRA")[0].firstChild.nodeValue);} else { var densidad_siembra="";}
	 	if ((fincas[i].getElementsByTagName("TRAB_PERMANENTES")[0].firstChild))
	       {var trab_permanentes = $.trim(fincas[i].getElementsByTagName("TRAB_PERMANENTES")[0].firstChild.nodeValue);} else { var trab_permanentes="";}
	 	if ((fincas[i].getElementsByTagName("TRAB_TEMPORALES")[0].firstChild))
	       {var trab_temporales = $.trim(fincas[i].getElementsByTagName("TRAB_TEMPORALES")[0].firstChild.nodeValue);} else { var trab_temporales="";}
	 	if ((fincas[i].getElementsByTagName("TRAB_COSECHA")[0].firstChild))
	       {var trab_cosecha = $.trim(fincas[i].getElementsByTagName("TRAB_COSECHA")[0].firstChild.nodeValue);} else { var trab_cosecha="";}

		   if ((fincas[i].getElementsByTagName("CUERPOS_AGUA")[0].firstChild))
	       {var cuerpos_agua = $.trim(fincas[i].getElementsByTagName("CUERPOS_AGUA")[0].firstChild.nodeValue);} else { var cuerpos_agua="";}
	 	if ((fincas[i].getElementsByTagName("TIPO_CUERPO_AGUA")[0].firstChild))
	       {var tipo_cuerpo_agua = $.trim(fincas[i].getElementsByTagName("TIPO_CUERPO_AGUA")[0].firstChild.nodeValue);} else { var tipo_cuerpo_agua="";}
	 	if ((fincas[i].getElementsByTagName("AGUA_POTABLE")[0].firstChild))
	       {var agua_potable = $.trim(fincas[i].getElementsByTagName("AGUA_POTABLE")[0].firstChild.nodeValue);} else { var agua_potable="";}

		   if ((fincas[i].getElementsByTagName("TIENE_BODEGA")[0].firstChild))
	       {var tiene_bodega = $.trim(fincas[i].getElementsByTagName("TIENE_BODEGA")[0].firstChild.nodeValue);} else { var tiene_bodega="";}
	 	if ((fincas[i].getElementsByTagName("TIENE_OFICINA")[0].firstChild))
	       {var tiene_oficina = $.trim(fincas[i].getElementsByTagName("TIENE_OFICINA")[0].firstChild.nodeValue);} else { var tiene_oficina="";}

		   if ((fincas[i].getElementsByTagName("TIENE_VIVIENDAS")[0].firstChild))
	       {var tiene_viviendas = $.trim(fincas[i].getElementsByTagName("TIENE_VIVIENDAS")[0].firstChild.nodeValue);} else { var tiene_viviendas="";}

		   if ((fincas[i].getElementsByTagName("ACTIVIDAD_REALIZADA")[0].firstChild))
	       {var actividad_realizada = $.trim(fincas[i].getElementsByTagName("ACTIVIDAD_REALIZADA")[0].firstChild.nodeValue);} else { var actividad_realizada="";}

		   if ((fincas[i].getElementsByTagName("ACTIVIDAD_PENDIENTE")[0].firstChild))
	       {var actividad_pendiente = $.trim(fincas[i].getElementsByTagName("ACTIVIDAD_PENDIENTE")[0].firstChild.nodeValue);} else { var actividad_pendiente="";}
	 	if ((fincas[i].getElementsByTagName("ACTIVIDAD_ANULADA")[0].firstChild))
	       {var actividad_anulada = $.trim(fincas[i].getElementsByTagName("ACTIVIDAD_ANULADA")[0].firstChild.nodeValue);} else { var actividad_anulada="";}
	 	if ((fincas[i].getElementsByTagName("METRICA_REALIZADA")[0].firstChild))
	       {var metrica_realizada = $.trim(fincas[i].getElementsByTagName("METRICA_REALIZADA")[0].firstChild.nodeValue);} else { var metrica_realizada="";}
	 	if ((fincas[i].getElementsByTagName("METRICA_PENDIENTE")[0].firstChild))
	       {var metrica_pendiente = $.trim(fincas[i].getElementsByTagName("METRICA_PENDIENTE")[0].firstChild.nodeValue);} else { var metrica_pendiente="";}
	 	if ((fincas[i].getElementsByTagName("METRICA_ANULADA")[0].firstChild))
	       {var metrica_anulada = $.trim(fincas[i].getElementsByTagName("METRICA_ANULADA")[0].firstChild.nodeValue);} else { var metrica_anulada="";}
		   
	 	if ((fincas[i].getElementsByTagName("COSECHA_PROMEDIO")[0].firstChild))
	       {var cosecha_promedio = $.trim(fincas[i].getElementsByTagName("COSECHA_PROMEDIO")[0].firstChild.nodeValue);} else { var cosecha_promedio="";}

		   if ((fincas[i].getElementsByTagName("FECHA_INICIO_COSECHA")[0].firstChild))
	       {var fecha_inicio_cosecha = $.trim(fincas[i].getElementsByTagName("FECHA_INICIO_COSECHA")[0].firstChild.nodeValue);} else { var fecha_inicio_cosecha="";}

		   if ((fincas[i].getElementsByTagName("FOTOGRAFIA")[0].firstChild))
	       {var fotografia = $.trim(fincas[i].getElementsByTagName("FOTOGRAFIA")[0].firstChild.nodeValue);} else { var fotografia="";}
	 	
		if ((fincas[i].getElementsByTagName("PRODUCTOR_INTERNO")[0].firstChild))
	       {var productor_interno = $.trim(fincas[i].getElementsByTagName("PRODUCTOR_INTERNO")[0].firstChild.nodeValue);} else { var productor_interno="";}


		var sql = "insert into Fincas (finca, productor, nombre, direccion, pais, depto, ciudad, telefono, email "
		+ ") VALUES (" + idfinca + "," + idproductor + ",'" + nombre + "','" + direccion  + "','" + pais + "','" + depto + "','" + ciudad + "','" + telefono  + "','" + email + "'"
		+ ")";
//		 if(idfinca=='23900001'){alert(sql);}
		 
	     tx.executeSql(sql,[],grabofincadb,errorfincadb);	   
		}
}
function grabofincadb(tx,results){ 
//alert("grabo registo en finca");
}
function errorfincadb(tx,error){
    
  //  alert(error);
}

function cargaEncuestas(tx){

	var xml = StringToXML(encuestaXML);
	var encuestas = xml.documentElement.getElementsByTagName("registro");
	var filter = "";

	for(var i = 0; i < encuestas.length ; i++){
		if ((encuestas[i].getElementsByTagName("IDENCUESTA")[0].firstChild))
	       {var idencuesta      = $.trim(encuestas[i].getElementsByTagName("IDENCUESTA")[0].firstChild.nodeValue);} else { var idencuesta="";}
		if (($.trim(encuestas[i].getElementsByTagName("IDPREGUNTA")[0].firstChild)))
		{ var idpregunta  = $.trim(encuestas[i].getElementsByTagName("IDPREGUNTA")[0].firstChild.nodeValue);  
         } else { var idpregunta="";}
		if (($.trim(encuestas[i].getElementsByTagName("ORDEN_PREGUNTA")[0].firstChild)))
		{ var orden_pregunta  = $.trim(encuestas[i].getElementsByTagName("ORDEN_PREGUNTA")[0].firstChild.nodeValue); 
         } else { var orden_pregunta="";}
		if ($.trim(encuestas[i].getElementsByTagName("PREGUNTA")[0].firstChild))
		{var pregunta        = $.trim(encuestas[i].getElementsByTagName("PREGUNTA")[0].firstChild.nodeValue);} else { var pregunta="";}
		if ($.trim(encuestas[i].getElementsByTagName("RESPUESTA1")[0].firstChild))
		{var respuesta1      = $.trim(encuestas[i].getElementsByTagName("RESPUESTA1")[0].firstChild.nodeValue);} else { var respuesta1="";}
		if ($.trim(encuestas[i].getElementsByTagName("RESPUESTA2")[0].firstChild))
		{var respuesta2      = $.trim(encuestas[i].getElementsByTagName("RESPUESTA2")[0].firstChild.nodeValue);} else { var respuesta2="";}
		if ($.trim(encuestas[i].getElementsByTagName("RESPUESTA3")[0].firstChild))
		{var respuesta3      = $.trim(encuestas[i].getElementsByTagName("RESPUESTA3")[0].firstChild.nodeValue);} else { var respuesta3="";}
		if ($.trim(encuestas[i].getElementsByTagName("TIPO_RESPUESTA")[0].firstChild))
		{var tipo_respuesta   = $.trim(encuestas[i].getElementsByTagName("TIPO_RESPUESTA")[0].firstChild.nodeValue);} else { var tipo_respuesta="";}
		var tipo1           = tiporespuesta(tipo_respuesta); 		
		//var tipo1           = $.trim(encuestas[i].getElementsByTagName("tipo1")[0].firstChild.nodeValue);
		var tipo2           = ""; // $.trim(encuestas[i].getElementsByTagName("tipo2")[0].firstChild.nodeValue);
		var tipo3           = ""; //$.trim(encuestas[i].getElementsByTagName("tipo3")[0].firstChild.nodeValue);
		if ($.trim(encuestas[i].getElementsByTagName("DIBUJO1")[0].firstChild))
		{var dibujo1         = $.trim(encuestas[i].getElementsByTagName("DIBUJO1")[0].firstChild.nodeValue);} else { var dibujo1="";}
		if ($.trim(encuestas[i].getElementsByTagName("DIBUJO2")[0].firstChild))
		{var dibujo2         = $.trim(encuestas[i].getElementsByTagName("DIBUJO2")[0].firstChild.nodeValue);} else { var dibujo1="";}
		if ($.trim(encuestas[i].getElementsByTagName("DIBUJO3")[0].firstChild))
		{var dibujo3         = $.trim(encuestas[i].getElementsByTagName("DIBUJO3")[0].firstChild.nodeValue);} else { var dibujo3="";}
		if ($.trim(encuestas[i].getElementsByTagName("CAMPO")[0].firstChild))
		{var campos          = $.trim(encuestas[i].getElementsByTagName("CAMPO")[0].firstChild.nodeValue);} else { var campos="";}
		//var campos          = $.trim(encuestas[i].getElementsByTagName("campo_tabla")[0].firstChild.nodeValue);
		if ($.trim(encuestas[i].getElementsByTagName("SQL_TABLA")[0].firstChild))
		{var sql_tabla       = $.trim(encuestas[i].getElementsByTagName("SQL_TABLA")[0].firstChild.nodeValue);} else { sql_tabla="";}
		if ($.trim(encuestas[i].getElementsByTagName("ID_TRANSACCION")[0].firstChild))
		{var id_transaccion  = $.trim(encuestas[i].getElementsByTagName("ID_TRANSACCION")[0].firstChild.nodeValue);} else { var id_transaccion="";}
		if ($.trim(encuestas[i].getElementsByTagName("AYUDA")[0].firstChild))
		{var ayuda  = $.trim(encuestas[i].getElementsByTagName("AYUDA")[0].firstChild.nodeValue);} else { var ayuda="";}
		if ($.trim(encuestas[i].getElementsByTagName("ACCION_CORRECTIVA")[0].firstChild))
		{var accion_correctiva = $.trim(encuestas[i].getElementsByTagName("ACCION_CORRECTIVA")[0].firstChild.nodeValue);} else { var accion_correctiva="";}

		var sql = "insert into encuesta (idencuesta,idpregunta,orden_pregunta,pregunta,respuesta1,respuesta2,respuesta3,tipo1,tipo2,tipo3,id_transaccion,campo,sql_tabla,dibujo1,dibujo2,dibujo3,ayuda,accion_correctiva) VALUES ('" + 
				idencuesta+"',"+idpregunta+","+orden_pregunta+",'"+pregunta+"','"+respuesta1+"','"+respuesta2+"','"+respuesta3+"','"+tipo1+"','"+tipo2+"','"+tipo3+"','"+id_transaccion+"','"+campos+"','"+sql_tabla+"','"+dibujo1+"','"+dibujo2+"','"+dibujo3+"','"+ayuda+"','"+accion_correctiva+"')";
//alert(sql);
		tx.executeSql(sql);
		}
}

function cargaPromotor(tx){
	$('#busy').append('8');
	var xml = StringToXML(promotorXML);
	var promotores = xml.documentElement.getElementsByTagName("registro");
	//alert(promotorXML);
	var filter = "";

	for(var i = 0; i < (promotores.length) ; i++){
		//alert(i);
		var id  = $.trim(promotores[i].getElementsByTagName("productor")[0].firstChild.nodeValue);		
		
		if ((promotores[i].getElementsByTagName("nombres")[0].firstChild))
	       {var firstname    = $.trim(promotores[i].getElementsByTagName("nombres")[0].firstChild.nodeValue);} else { var firstname="";}
		if ((promotores[i].getElementsByTagName("apellidos")[0].firstChild)) 
	       {var lastname    = $.trim(promotores[i].getElementsByTagName("apellidos")[0].firstChild.nodeValue);} else { var lastname="";}
		if ((promotores[i].getElementsByTagName("supervisor")[0].firstChild)) 
	       {var managerID    = $.trim(promotores[i].getElementsByTagName("supervisor")[0].firstChild.nodeValue);} else { var managerID="";}
		if ((promotores[i].getElementsByTagName("titulo")[0].firstChild)) 
	       {var title   = $.trim(promotores[i].getElementsByTagName("titulo")[0].firstChild.nodeValue);} else { var title="";}
		if ((promotores[i].getElementsByTagName("depto")[0].firstChild)) 
	       {var department    = $.trim(promotores[i].getElementsByTagName("depto")[0].firstChild.nodeValue);} else { var department="";}
		if ((promotores[i].getElementsByTagName("telefono")[0].firstChild))
	       {var officePhone    = $.trim(promotores[i].getElementsByTagName("telefono")[0].firstChild.nodeValue);} else  { var officePhone="";}
		if ((promotores[i].getElementsByTagName("celular")[0].firstChild)) 
	       {var cellPhone    = $.trim(promotores[i].getElementsByTagName("celular")[0].firstChild.nodeValue);} else { var cellPhone="";}
		if ((promotores[i].getElementsByTagName("email")[0].firstChild))
	       {var email    = $.trim(promotores[i].getElementsByTagName("email")[0].firstChild.nodeValue);} else  { var email="";}
		if ((promotores[i].getElementsByTagName("ciudad")[0].firstChild))
	       {var city    = $.trim(promotores[i].getElementsByTagName("ciudad")[0].firstChild.nodeValue);} else  { var city="";}
		if ((promotores[i].getElementsByTagName("fotografia")[0].firstChild))
	       {var picture    = $.trim(promotores[i].getElementsByTagName("fotografia")[0].firstChild.nodeValue);} else  { var picture="";}
		if ((promotores[i].getElementsByTagName("latitud")[0].firstChild)) 
	       {var latitude    = $.trim(promotores[i].getElementsByTagName("latitud")[0].firstChild.nodeValue);} else { var latitude="";}
		if ((promotores[i].getElementsByTagName("longitud")[0].firstChild)) 
	       {var longitude    = $.trim(promotores[i].getElementsByTagName("longitud")[0].firstChild.nodeValue);} else { var longitude="";}
		if ((promotores[i].getElementsByTagName("direccion")[0].firstChild))
	       {var address    = $.trim(promotores[i].getElementsByTagName("direccion")[0].firstChild.nodeValue);} else  { var address="";}
		if ((promotores[i].getElementsByTagName("formulario")[0].firstChild))
		   {var encuesta    = $.trim(promotores[i].getElementsByTagName("formulario")[0].firstChild.nodeValue);} else  { var encuesta="";}
		if ((promotores[i].getElementsByTagName("formulario2")[0].firstChild))
	       {var formulario2    = $.trim(promotores[i].getElementsByTagName("formulario2")[0].firstChild.nodeValue);} else  { var formulario2="";}
		
		if ((promotores[i].getElementsByTagName("metrica0101")[0].firstChild))
	       {var metrica0101    = $.trim(promotores[i].getElementsByTagName("metrica0101")[0].firstChild.nodeValue);} else  { var metrica0101="";}
		
		if ((promotores[i].getElementsByTagName("metrica0102")[0].firstChild))
	       {var metrica0102    = $.trim(promotores[i].getElementsByTagName("metrica0102")[0].firstChild.nodeValue);} else  { var metrica0102="";}
		
		if ((promotores[i].getElementsByTagName("metrica0103")[0].firstChild))
	       {var metrica0103    = $.trim(promotores[i].getElementsByTagName("metrica0103")[0].firstChild.nodeValue);} else  { var metrica0103="";}
		
		if ((promotores[i].getElementsByTagName("metrica0201")[0].firstChild))
	       {var metrica0201    = $.trim(promotores[i].getElementsByTagName("metrica0201")[0].firstChild.nodeValue);} else  { var metrica0201="";}
		
		if ((promotores[i].getElementsByTagName("metrica0202")[0].firstChild))
	       {var metrica0202    = $.trim(promotores[i].getElementsByTagName("metrica0202")[0].firstChild.nodeValue);} else  { var metrica0202="";}
		
		if ((promotores[i].getElementsByTagName("metrica0203")[0].firstChild))
	       {var metrica0203    = $.trim(promotores[i].getElementsByTagName("metrica0203")[0].firstChild.nodeValue);} else  { var metrica0203="";}
		
		
		if ((promotores[i].getElementsByTagName("nivel")[0].firstChild))
	       {var nivel    = $.trim(promotores[i].getElementsByTagName("nivel")[0].firstChild.nodeValue);} else  { var nivel='3';} 		
				
		var $sql = "INSERT INTO Promotor (id,firstName,lastName,managerId,title,department,officePhone,cellPhone,email,city,picture,latitude,longitude,address,encuesta,formulario2,nivel,metrica0101,metrica0102,metrica0103,metrica0201,metrica0202,metrica0203) VALUES (";
		    $sql = $sql +  id + ",'" + firstname + "','" + lastname + "'," + managerID + ",'" +  title + "','" + department + "','" + officePhone + "','" + cellPhone + "','" + email;		    
		    $sql = $sql +  "','" + city + "','" + picture + "'," + latitude + "," + longitude + ",'" + address + "','" + encuesta +"','" + formulario2 +"'," + nivel+"," + metrica0101+"," + metrica0102+"," + metrica0103+"," + metrica0201+"," + metrica0202+"," + metrica0203 + ")";
		
		tx.executeSql($sql,[],exitodb,errordb);
		}
	
	
	    $('#busy').append("9");
//	    if (nivel_permiso < 1){
		    getPromotors(tx);
//        }
//	    else
//		{
//		    getPromotors(tx);
		   //window.location.href="Promotordetails.html?id=' + usuario + '";
//		}
}

function exitodb(){  //exito
	var cuentaexito=1;
}
function errordb(e){//alert("Error en DB");
   //alert('error ');
	var cuentaerror = 1;
}

function tiporespuesta(tipo_respuesta){  
//alert(tipo_respuesta);
	switch  (tipo_respuesta) {  
	case "1":
		var resp = "Number";
		break;
	case "2":
		var resp =  "Text";
		break;
	case "3":
		var resp = "Date";
		break;
	case "4":
		var resp = "Radio";
		break;
	case "5":
		var resp = "Tel";
		break;		
	case "6":
		var resp = "Email";
		break;		
	default:
		var resp = "Text";
	};
	//alert(resp);
	return resp;
} 