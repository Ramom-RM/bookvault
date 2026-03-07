<?php

$livro = $DB->query(

    query: "select * from livros where id = :id",

    class: Livro::class,

    params: ['id' => $_GET['id']]

)->fetch();

view('livro', compact('livro'));