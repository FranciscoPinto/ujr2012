<?php
	$db_name = "ujr3d12.db";
	$db_access_mode = 0666;

	$db = new SQLiteDatabase($db_name, $db_access_mode, $message);
	if(! $db)
		echo $message;
?>
