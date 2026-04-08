<?php

$controller = trim(parse_url($_SERVER['REQUEST_URI'])['path'], '/');
$controller = str_replace('-', '_', $controller);

if (!$controller) $controller = 'index';

$controllerPath = __DIR__ . "/../Controllers/{$controller}.controller.php";

if (! file_exists($controllerPath)) {

    abort(404);

}

require $controllerPath;
