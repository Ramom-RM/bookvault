<?php

if ($_SERVER['REQUEST_METHOD'] != 'POST') {
    header('Location: /meus-livros');
    exit();
}

if (! auth()) {
    abort(403);
}

$id = $_POST['id'] ?? null;
$livro = Livro::get($id);

if (! $livro) {
    abort(404);
}

if ($livro->usuario_id !== auth()->id) {
    abort(403);
}

$validacao = Validacao::validar([
    'titulo' => ['required', 'min:3'],
    'autor' => ['required'],
    'descricao' => ['required'],
    'ano_de_lancamento' => ['required']
], $_POST);

if ($validacao->naoPassou()) {
    header('Location: /livro-editar?id=' . $livro->id);
    exit();
}

$titulo = $_POST['titulo'];
$autor = $_POST['autor'];
$descricao = $_POST['descricao'];
$ano_de_lancamento = $_POST['ano_de_lancamento'];

$params = compact('titulo', 'autor', 'descricao', 'ano_de_lancamento', 'id');

$query = "update livros set titulo = :titulo, autor = :autor, descricao = :descricao, ano_de_lancamento = :ano_de_lancamento";

if (isset($_FILES['imagem']) && $_FILES['imagem']['error'] === UPLOAD_ERR_OK && strlen($_FILES['imagem']['name'])) {
    $novoNome = md5(rand());
    $extensao = pathinfo($_FILES['imagem']['name'], PATHINFO_EXTENSION);
    $imagem = "images/$novoNome.$extensao";
    move_uploaded_file($_FILES['imagem']['tmp_name'], __DIR__ . '/../../public/' . $imagem);
    $query .= ", imagem = :imagem";
    $params['imagem'] = $imagem;
}

$query .= ' where id = :id';

$database->query($query, params: $params);

flash()->push('mensagem', 'Livro atualizado com sucesso!');

header('Location: /livro?id=' . $livro->id);
exit();