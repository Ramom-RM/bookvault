<?php

$mensagem = $_REQUEST['mensagem'] ?? '';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {

    $email = $_POST['email'];

    $senha = $_POST['senha'];

    $usuario = $database->query(

        query: " select * from usuarios where email = :email and senha = :senha", 

        class: Usuario ::class,

        params: compact('email', 'senha')

    )->fetch();

    if ($usuario) {

        $_SESSION['auth'] = $usuario;

        $_SESSION['mensagem'] = "Seja bem-vindo" . $usuario->nome . "!";

        header("Location: /");

        exit();

    }

}

view('login', compact('mensagem'));