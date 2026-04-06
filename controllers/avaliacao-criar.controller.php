<?php

if ($_SERVER['REQUEST_METHOD'] != "POST") {

    header("Location: /");
    
    exit();

}

$usuario_id = auth()->id;

$livro_id = $_POST['livro_id'];

$avaliacao = $_POST['avaliacao'];

$nota = $_POST['nota'];

$validacao = Validacao::validar([

    'avaliacao' => ['required'],
    'nota' => ['required']

], $_POST);

if ($validacao->naoPassou()) {

    header("Location: /livro?id=" . $livro_id);

    exit();

}

$database->query(

    query: "insert into avaliacoes (usuario_id, livro_id, avaliacao, nota)
    values ( :usuario_id, :livro_id, :avaliacao, :nota );",

    params: compact('usuario_id', 'livro_id', 'avaliacao', 'nota')

);

flash()->push('mensagem', 'Avaliação criada com sucesso!');

header("Location: /livro?id=" . $livro_id);

exit();