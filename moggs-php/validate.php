<?php

function validUser($uname, $pwd) {

	$users = array("mp" => "fe95b6159b051499a92c755b131beda9", "kt" => "dfc506220188c048ccab7cfa402e2353", "ls" => "c4222923343bcbc2627cbafe8a84f91c");
	$user_names = array("melpaul" => "mp", "kaytrev" => "kt", "lesodin" => "ls");
	
	if ($users[$user_names[$uname]] == md5($pwd)) return true;
	else return false;
	
}

$user_names = array("melpaul" => "mp", "kaytrev" => "kt", "lesodin" => "ls");
	
//include the file from Part 1 of the article.
if (validUser($_POST["username"], $_POST["password"])) {
	//user is valid
	session_start();
	$_SESSION["username"] = $user_names[$_POST["username"]];
	header ("Location: moggs.php");
} else {
	//user is not valid.
	echo "<script type='text/javascript'>";
	echo "alert('Invalid Login');";
	echo "history.back();";  //return to the login page.
	echo "</script>";
}

?>