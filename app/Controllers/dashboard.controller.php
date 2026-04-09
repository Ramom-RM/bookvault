<?php

if (! auth()) {
    header('Location: /login');
    exit();
}

$totalLivros = $database
    ->query('select count(*) as total from livros')
    ->fetchColumn();

$totalAvaliacoes = $database
    ->query('select count(*) as total from avaliacoes')
    ->fetchColumn();

$mediaAvaliacoes = $database
    ->query('select round(avg(nota), 2) as media from avaliacoes')
    ->fetchColumn();

$meusLivros = Livro::meus(auth()->id);
$quantidadeMeusLivros = count($meusLivros);

$recentBooks = $database
    ->query('select l.* from livros l order by l.id desc limit 3', Livro::class)
    ->fetchAll();

$metaTotal = 50;
$metaConcluida = min($quantidadeMeusLivros, $metaTotal);

view('dashboard', compact(
    'totalLivros',
    'totalAvaliacoes',
    'mediaAvaliacoes',
    'quantidadeMeusLivros',
    'recentBooks',
    'metaTotal',
    'metaConcluida'
));
