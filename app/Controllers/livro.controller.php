<?php

$livro = Livro::get($_GET['id']);

$avaliacoes = $database
    ->query("
        select 
            a.*,
            u.nome as usuario_nome
        from 
            avaliacoes a
        left join
            usuarios u on u.id = a.usuario_id
        where 
            a.livro_id = :id
        order by
            a.id desc
    ", Avaliacao::class, ['id' => $_GET['id']])
    ->fetchAll();

view('livro', compact('livro', 'avaliacoes'));