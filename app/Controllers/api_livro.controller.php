<?php

header('Content-Type: application/json; charset=utf-8');

// Verificar método HTTP
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Criar novo livro
    $input = json_decode(file_get_contents('php://input'), true);

    // Validar campos obrigatórios
    if (empty($input['titulo']) || empty($input['autor']) || empty($input['ano_de_lancamento']) || empty($input['descricao'])) {
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'error' => 'Título, autor, ano e descrição são obrigatórios.'
        ], JSON_UNESCAPED_UNICODE);
        exit();
    }

    try {
        $database->query(
            "insert into livros (titulo, autor, ano_de_lancamento, descricao) 
             values (:titulo, :autor, :ano_de_lancamento, :descricao)",
            null,
            [
                'titulo' => trim($input['titulo']),
                'autor' => trim($input['autor']),
                'ano_de_lancamento' => (int)$input['ano_de_lancamento'],
                'descricao' => trim($input['descricao'])
            ]
        );

        echo json_encode([
            'success' => true,
            'data' => ['message' => 'Livro criado com sucesso.']
        ], JSON_UNESCAPED_UNICODE);
        exit();
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'error' => 'Erro ao criar livro: ' . $e->getMessage()
        ], JSON_UNESCAPED_UNICODE);
        exit();
    }
}

// GET - Buscar livro por ID
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
