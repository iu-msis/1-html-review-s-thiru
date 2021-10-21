<?php

try {
    $_POST = json_decode(
                file_get_contents('php://input'), 
                true,
                2,
                JSON_THROW_ON_ERROR
            );
} catch (Exception $e) {
    header($_SERVER["SERVER_PROTOCOL"] . " 400 Bad Request");
    // print_r($_POST);
    // echo file_get_contents('php://input');
    exit;
}

require("class/DbConnection.php");

// Step 1: Get a datase connection from our helper class
$db = DbConnection::getConnection();

// Step 2: Create & run the query
// Note the use of parameterized statements to avoid injection
$stmt = $db->prepare(
  'INSERT INTO books (title, author, year_published, publisher, page_count, msrp)
  VALUES (?, ?, ?, ?, ?, ?)'
);

$stmt->execute([
  $_POST['title'],
  $_POST['author'],
  $_POST['year_published'],
  $_POST['publisher'],
  $_POST['page_count'],
  $_POST['msrp']
]);
header('HTTP/1.1 303 See Other');
header('Location: ../books/');