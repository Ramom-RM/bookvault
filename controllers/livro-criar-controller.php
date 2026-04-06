<?php

if($_SERVER['REQUEST_METHOD'] != 'POST') {

    header("Location: /meus-livros");

    exit();

}

if(!auth()) {

   abort(403);

}


$usuario_id = auth() ->id;

$titulo = $_POST['titulo'];

$autor = $_POST['autor'];

$descricao = $_POST['descricao'];

$ano_de_lancamento = $_POST['ano_de_lancamento'];


$validacao = Validacao::validar([

    'titulo' => ['required', 'min:3'],
    'autor' => ['required', 'min:3'],
    'descricao' => ['required', 'min:10'],
    'ano_de_lancamento' => ['required', 'integer']

], $_POST);


if ($validacao->naoPassou('avaliacao_criar')) {

    header("Location: /meus-livros");

    exit();

}

$database->query(
    "insert into livros ( titulo, autor, descricao, ano_de_lancamento)
    values ( :titulo, :autor, :descricao, :ano_de_lancamento",
    params: compact('titulo', 'autor', 'descricao', 'ano_de_lancamento')
);

flash()->push('mensagem', "Livro criado com sucesso!");

header("Location: /meus-livros");

exit();


