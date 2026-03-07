<?php

if ($_SERVER['REQUEST_METHOD'] == 'POST') {

    $resultado = $database->query(

        query: "insert into usuarios (nome, email, senha) values (:nome, :email, :senha)",

        params: [
            'nome' => $_POST['nome'],
            'email' => $_POST['email'],
            'senha' => $_POST['senha']
        ]

    );

    header('location: /login?mensagem=Registrado com sucesso!');

    exit();

};