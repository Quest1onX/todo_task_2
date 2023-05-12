<?php
$servername = "localhost";
$username = "root";
$password = "Quest1on.";
$database = "tasks";

$conn = mysqli_connect($servername, $username, $password, $database);

if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $taskName = $_POST['taskName'];
    $date = $_POST['date'];
    $priority = $_POST['priority'];

    $sql = "INSERT INTO todo_list (name, date, priority) VALUES ('$taskName', '$date', '$priority')";

    if (mysqli_query($conn, $sql)) {
        echo "New record created successfully";
        mysqli_close($conn);
        header("Location: index.html");
        exit();
    } else {
        echo "Error: " . $sql . "<br>" . mysqli_error($conn);
    }
}


?>