var informehtml="";

function informe_vista(){
	var informehtml="";
	informehtml += "<h1>Plan de Accion</h1>";
	informehtml += "<h2>Productor:</h2>";
	informehtml += "<h3>Finca</h3>";
	informehtml += setHTMLencode($("#wrapper").html());
	xmlhttp.open("GET",'mailto: sergiofgt@gmail.com &subject=prueba &body='  + informehtml,true);
	xmlhttp.send();
//    window.open("informe.html?i="+ informehtml+"","_blank", "toolbar=yes, scrollbars=yes, resizable=yes, top=500, left=500, width=400, height=400");
}

function setHTMLencode(doc){
    var html=doc.replace(/</g,"%3C").replace(/=/g,"%3D").replace(/>/g,"%3E").replace(/"/g,"%22");
    return html;
}