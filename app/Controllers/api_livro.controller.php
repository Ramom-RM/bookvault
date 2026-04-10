<?php

header('Content-Type: application/json; charset=utf-8');

$id = $_GET['id'] ?? null;

if (! $id || ! is_numeric($id)) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'error' => 'ID inválido para busca do livro.'
    ], JSON_UNESCAPED_UNICODE);
    exit();
}

$livro = Livro::get($id);

if (! $livro) {
    http_response_code(404);
    echo json_encode([
        'success' => false,
        'error' => 'Livro não encontrado.'
    ], JSON_UNESCAPED_UNICODE);
    exit();
}

$avaliacoes = $database
    ->query(
        "select 
            a.*, 
            u.nome as usuario_nome 
        from 
            avaliacoes a 
        left join 
            usuarios u on u.id = a.usuario_id 
        where 
            a.livro_id = :livro_id 
        order by 
            a.id desc",
        Avaliacao::class,
        ['livro_id' => $id]
    )
    ->fetchAll();

echo json_encode([
    'success' => true,
    'data' => [
        'livro' => $livro,
        'avaliacoes' => $avaliacoes
    ]
], JSON_UNESCAPED_UNICODE);
exit();
