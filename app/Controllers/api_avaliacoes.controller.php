<?php

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        'success' => false,
        'error' => 'Método não permitido. Use POST.'
    ], JSON_UNESCAPED_UNICODE);
    exit();
}

$rawBody = file_get_contents('php://input');
$data = json_decode($rawBody, true);

if (! is_array($data)) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'error' => 'JSON inválido.'
    ], JSON_UNESCAPED_UNICODE);
    exit();
}

$livro_id = $data['livro_id'] ?? null;
$nota = $data['nota'] ?? null;
$comentario = $data['comentario'] ?? null;

if (! auth()) {
    http_response_code(401);
    echo json_encode([
        'success' => false,
        'error' => 'Usuário não autenticado.'
    ], JSON_UNESCAPED_UNICODE);
    exit();
}

$usuario_id = auth()->id;

$errors = [];

if (! $livro_id || ! is_numeric($livro_id)) {
    $errors[] = 'livro_id deve ser um número válido.';
}

if (! $nota || ! is_numeric($nota) || $nota < 1 || $nota > 5) {
    $errors[] = 'nota deve ser um número entre 1 e 5.';
}

if (! is_string($comentario) || trim($comentario) === '') {
    $errors[] = 'comentario é obrigatório.';
}

if ($errors) {
    http_response_code(422);
    echo json_encode([
        'success' => false,
        'error' => implode(' ', $errors)
    ], JSON_UNESCAPED_UNICODE);
    exit();
}

$livro = Livro::get($livro_id);

if (! $livro) {
    http_response_code(404);
    echo json_encode([
        'success' => false,
        'error' => 'Livro não encontrado.'
    ], JSON_UNESCAPED_UNICODE);
    exit();
}

$database->query(
    query: "insert into avaliacoes (usuario_id, livro_id, avaliacao, nota)
    values (:usuario_id, :livro_id, :avaliacao, :nota)",
    params: [
        'usuario_id' => $usuario_id,
        'livro_id' => $livro_id,
        'avaliacao' => $comentario,
        'nota' => $nota,
    ]
);

echo json_encode([
    'success' => true
], JSON_UNESCAPED_UNICODE);
exit();
