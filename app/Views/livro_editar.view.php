<?php

$action = $action ?? '/livro-atualizar';
$validacoes = flash()->get('validacoes');
?>

<section class="bv-section">
    <?php require __DIR__ . '/partials/_livro_form.php'; ?>
</section>
