<?php
$img2=$_GET["img"];
    // verificar si existe carpeta, si no existe crearla   file_exist() 
	//if (file_exist("fotografias/fotos$img2/"))
	//{
	    $lineas=scandir("fotografias/fotos$img2/");
		$t = count($lineas) - 1;
		// nombre del archivo, es correlativo entero, se cuenta los elementos y se suma uno.
		$file_name=$_FILES["imagen"]['name'];
		echo $file_name;
		$file_name= $t . ".jpg";
		$add="fotografias/fotos$img2/$file_name";
		$tmp=$_FILES["imagen"]['tmp_name'];
			if(move_uploaded_file ($tmp, $add)){
			   echo "<h1>Imagen Actualizada</h1>";
			   header("Location:index4.html?id=$img2");
			}else{echo "Error al subir el archivo";}
   //} else {echo "No existe carpeta del promotor, solicitelo al Administrador";}
?>