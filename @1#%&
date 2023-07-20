<?php
/*
 * sample.php
 */


session_start();

$shichoson     = $_SESSION['shichoson'];
$course        = $_SESSION['course'];
$course_name   = $_SESSION['course_name'];

$con = dbconnect("server", "english");

$shopcode      = urldecode($_REQUEST['shopcode']);
$venuecode     = $_REQUEST['venuecode'];

$sql  = "SELECT zipcode, shopcode FROM shop WHERE zipcode = '" . $venuecode . "' AND shopcode = '" . $shopcode . "' ORDER BY zipcode;";

$ret = dbexec($con, $sql);

$rows = pg_num_rows($ret);
if ($rows != 1) {
    dbdisconnect($con);
  $url = "https://".$_SERVER['HTTP_HOST']."/sample.html";
  header("Location: {$url}");
  exit;

}

function dbconnect($hostname, $dbname){

	$port	 = "5432";
	$options = "";
	$tty	 = "";

	if(empty($hostname) || empty($dbname) || $hostname=="SERVER" || $dbname=="DBNAME" || $hostname=="DBSVR"){
		header("HTTP/1.0 403 Forbidden");
		exit;
	}

	$con = pg_connect($hostname, $port, $options, $tty, $dbname);

	if (!$con){
		exit;
	}
	
	return $con;
}

function dbexec($con,$sql){

	$result = pg_query($con, $sql);

	if(!$result){
		$result = pg_exec($con, "rollback");
		exit;
	}
	
	return $result;
}

function dbdisconnect($con){
	$ret = pg_close($con);
}

?>
