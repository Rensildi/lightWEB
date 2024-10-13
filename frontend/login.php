<?php
header('Content-Type: application/json');

$data = json_decode(file_get_contents("php://input"));
$username = $data->username;
$password = $data->password;

// Load user data
$users = json_decode(file_get_contents('users.json'), true);
$response = ['success' => false, 'message' => 'Invalid credentials'];

if (isset($users[$username]) && password_verify($password, $users[$username])) {
    $response['success'] = true;
    $response['message'] = 'Login successful!';
}

echo json_encode($response);
?>
