<?php

if ($_SERVER['REQUEST_METHOD'] == 'POST') {

    $validacoes = [];

    $nome = $_POST['nome'];

    $email = $_POST['email'];

    $email_confirmacao = $_POST['email_confirmacao'];

    $senha = $_POST['senha'];

    if (strlen($nome) == 0) {

        $validacoes[] = 'O nome é obrigatório.';

    }

    if (strlen($email) == 0) {

        $validacoes[] = 'O email é obrigatório.';

    }

    if (! filter_var($email, FILTER_VALIDATE_EMAIL)) {

        $validacoes[] = 'O email é inválido.';

    }

    if ($email != $email_confirmacao) {

        $validacoes[] = 'O email de confirmação está diferente.';

    }

    if (strlen($senha) == 0) {

        $validacoes[] = 'A senha é obrigatória.';

    }

    if (strlen($senha) < 8 || strlen($senha) > 30) {

        $validacoes[] = 'A senha precisa ter entre 8 e 30 caracteres.';

    }

    if (!str_contains($senha, '*')) {

        $validacoes[] = 'A senha precisa um * nela.';

    }

    if (sizeof($validacoes) > 0) {

        $_SESSION['validacoes'] = $validacoes;

        header("Location: /login");

        exit();

    }

    $database->query(

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