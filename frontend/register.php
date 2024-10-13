<?php
header('Content-Type: application/json');

$data = json_decode(file_get_contents("php://input"));
$username = $data->username;
$password = $data->password;

// Store user data (you should implement proper storage and security)
file_put_contents('users.json', json_encode([$username => password_hash($password, PASSWORD_DEFAULT)]), FILE_APPEND);

echo json_encode(['message' => 'Registered successfully!']);
?>
