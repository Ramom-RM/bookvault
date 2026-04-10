<?php

header('Content-Type: application/json; charset=utf-8');

$livros = Livro::all('');

echo json_encode([
    'success' => true,
    'data' => $livros
], JSON_UNESCAPED_UNICODE);
exit();
