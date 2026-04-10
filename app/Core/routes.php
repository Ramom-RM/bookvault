<?php

$requestPath = trim(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH), '/');
$requestPath = str_replace('-', '_', $requestPath);

if (! $requestPath) {
    $requestPath = 'dashboard';
}

if (strpos($requestPath, '..') !== false) {
    abort(404);
}

if (strpos($requestPath, 'api/') === 0) {
    $apiPath = substr($requestPath, 4);
    $apiPath = trim($apiPath, '/');

    if (! preg_match('/^[a-zA-Z0-9_\/]+$/', $apiPath)) {
        abort(404);
    }

    if ($apiPath === 'livros') {
        require __DIR__ . '/../Controllers/api_livros.controller.php';
        exit;
    }

    if ($apiPath === 'livro') {
        require __DIR__ . '/../Controllers/api_livro.controller.php';
        exit;
    }

    if ($apiPath === 'avaliacoes') {
        require __DIR__ . '/../Controllers/api_avaliacoes.controller.php';
        exit;
    }

    if ($apiPath === 'me') {
        require __DIR__ . '/../Controllers/api_me.controller.php';
        exit;
    }

    abort(404);
}

$controller = $requestPath;

if (strpos($controller, '..') !== false || ! preg_match('/^[a-zA-Z0-9_]+$/', $controller)) {
    abort(404);
}

$allowedControllers = [
    'index',
    'dashboard',
    'livro',
    'livro_criar',
    'livro_editar',
    'livro_atualizar',
    'avaliacao_criar',
    'meus_livros',
    'registrar',
    'login',
    'logout'
];

if (! in_array($controller, $allowedControllers, true)) {
    abort(404);
}

$controllerPath = __DIR__ . "/../Controllers/{$controller}.controller.php";

if (! file_exists($controllerPath)) {
    abort(404);
}

require $controllerPath;
