<?php
$servername = "localhost"; 
$username = "root";
$password = "Quest1on.";
$database = "tasks";

$conn = mysqli_connect($servername, $username, $password, $database);

if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

$sql = "SELECT * FROM todo_list";
$result = mysqli_query($conn, $sql);



$tasks = array();
while ($row = mysqli_fetch_assoc($result)) {
    $tasks[] = $row;
}


mysqli_close($conn);


header('Content-Type: application/json');
echo json_encode($tasks);

?>