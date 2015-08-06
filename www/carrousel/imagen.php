<?php
$img = $_REQUEST["id"];
echo "<form enctype='multipart/form-data' name = 'imagenform' method='post' action =subeimagen.php?img=".$img.">
       <input type='hidden' name='MAX_FILE_SIZE' value='10000000' >
       <h1><input name='imagen' type='file' ></h1>
       <h1><input type = 'submit' name = 'imagen'  value = 'Subir imagen' ></h1>
</form>"

?>