<?php

if (! auth()) {

    header('Location: /');

    exit();

}

$livros = Livro::meus(auth()->id);

view('meus-livros', compact('livros'));