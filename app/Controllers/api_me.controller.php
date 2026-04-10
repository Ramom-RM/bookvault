<?php

header('Content-Type: application/json; charset=utf-8');

$user = auth();

if ($user) {
    echo json_encode([
        'success' => true,
        'data' => [
            'id' => $user->id,
            'nome' => $user->nome,
            'email' => $user->email
        ]
    ], JSON_UNESCAPED_UNICODE);
} else {
    echo json_encode([
        'success' => false,
        'data' => null
    ], JSON_UNESCAPED_UNICODE);
}

exit();
