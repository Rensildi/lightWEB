<?php
header('Content-Type: application/json');

$data = json_decode(file_get_contents("php://input"));
$username = $data->username;
$password = $data->password;

// Check if the users.json file exists, if not, create it
$usersFile = 'users.json';
if (!file_exists($usersFile)) {
    file_put_contents($usersFile, json_encode([]));
}

// Load existing users
$users = json_decode(file_get_contents($usersFile), true);

// Check if the username already exists
if (isset($users[$username])) {
    echo json_encode(['message' => 'Username already exists!']);
    exit;
}

// Store user data (hash the password for security)
$users[$username] = password_hash($password, PASSWORD_DEFAULT);
file_put_contents($usersFile, json_encode($users));

echo json_encode(['message' => 'Registered successfully!']);
?>
