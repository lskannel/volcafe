function StringToXML(xmlData) {
    if (window.ActiveXObject) {
    	//for IE5, IE6
        xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
        xmlDoc.async = "false";
        xmlDoc.loadXML(xmlData);
        return xmlDoc;
    } else if (document.implementation && document.implementation.createDocument) {
    	//for IE7+, Firefox, Chrome, Opera, Safari
        parser = new DOMParser();
        xmlDoc = parser.parseFromString(xmlData,"text/xml");
        return xmlDoc;
    }
}
function XMLToString(xmlDoc){
	var xmlData = "";
	try{
		//for IE7+, Firefox, Chrome, Opera, Safari
		xmlData = (new XMLSerializer()).serializeToString(xmlDoc);
	}catch(e){
		//for IE5, IE6
		xmlData = xmlDoc.xml;
	}
	return xmlData;
}
function setXMLSintax(doc){
	n = doc.search("&lt;")-1;
    l = doc.length;
    xml=doc.slice(n,l);
    n = xml.search("<");
    l = xml.length;            
    doc=xml.slice(1,n);
    xml=doc.replace(/&lt;/g,"<").replace(/&apos;/g,"'").replace(/&gt;/g,">");
    return xml;
}