<?php

if (! auth()) {
    header('Location: /login');
    exit();
}

$id = $_GET['id'] ?? null;
$livro = Livro::get($id);

if (! $livro) {
    abort(404);
}

if ($livro->usuario_id !== auth()->id) {
    abort(403);
}

$action = '/livro-atualizar';

view('livro_editar', compact('livro', 'action'));