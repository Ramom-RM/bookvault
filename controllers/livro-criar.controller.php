<?php

if ($_SERVER['REQUEST_METHOD'] != "POST") {

    header("Location: /meus-livros");
    
    exit();

}

if (! auth()) {

    abort(403);

}

$usuario_id = auth()->id;

$titulo = $_POST['titulo'];

$autor = $_POST['autor'];

$descricao = $_POST['descricao'];

$ano_de_lancamento = $_POST['ano_de_lancamento'];

$validacao = Validacao::validar([

    'titulo' => ['required', 'min:3'],
    'autor' => ['required'],
    'descricao' => ['required'],
    'ano_de_lancamento' => ['required']

], $_POST);

if ($validacao->naoPassou()) {

    header("Location: /meus-livros");

    exit();

}

$database->query(
    "insert into livros (titulo, autor, descricao, ano_de_lancamento, usuario_id)
    values (:titulo, :autor, :descricao, :ano_de_lancamento, :usuario_id);",

    params: compact('titulo', 'autor', 'descricao', 'ano_de_lancamento', 'usuario_id')
);

flash()->push('mensagem', 'Livro cadastrado com sucesso!');

header("Location: /meus-livros");

exit();