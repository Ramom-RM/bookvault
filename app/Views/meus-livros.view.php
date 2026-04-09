<?php
$action = '/livro-criar';
$livro = null;
?>

<section class="bv-section">
    <div class="bv-page-header">
        <p class="bv-page-badge">Meus livros</p>
        <h1 class="bv-page-title">Gerencie sua coleção</h1>
        <p class="bv-page-description">Visualize seus livros e cadastre novos exemplares mantendo o estilo do BookVault.</p>
    </div>

    <div class="bv-form-layout">
        <div class="bv-books-container bv-card bv-glass-card">
            <div class="bv-card-header">
                <div>
                    <h2>Seus livros</h2>
                    <p class="bv-card-subtitle">Livros cadastrados por você.</p>
                </div>
            </div>

            <?php if (! count($livros)): ?>
                <div class="bv-empty-state">Você ainda não cadastrou nenhum livro.</div>
            <?php else: ?>
                <div class="bv-books-grid">
                    <?php foreach($livros as $livro): ?>
                        <?php require __DIR__ . '/partials/_livro.php'; ?>
                    <?php endforeach; ?>
                </div>
            <?php endif; ?>
        </div>

        <div class="bv-book-form-panel">
            <?php require __DIR__ . '/partials/_livro_form.php'; ?>
        </div>
    </div>
</section>
