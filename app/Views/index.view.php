<section class="bv-section">
    <div class="bv-page-header">
        <p class="bv-page-badge">Explorar</p>
        <h1 class="bv-page-title">Estante de livros</h1>
        <p class="bv-page-description">Descubra os livros cadastrados no seu BookVault e explore avaliações, capas e detalhes.</p>
    </div>

    <div class="bv-page-actions">
        <form class="bv-search-bar" method="GET">
            <input
                type="text"
                name="pesquisar"
                value="<?= htmlspecialchars($_REQUEST['pesquisar'] ?? '') ?>"
                class="bv-input bv-search-input"
                placeholder="Pesquisar por título ou autor..."
            >
            <button type="submit" class="bv-button-primary">Buscar</button>
        </form>

        <?php if (auth()): ?>
            <a href="/meus-livros" class="bv-button">Novo livro</a>
        <?php endif; ?>
    </div>

    <div class="bv-section-description">
        <p class="bv-section-note">Mostrando <?= count($livros) ?> livro(s)</p>
    </div>

    <?php if (! count($livros)): ?>
        <div class="bv-empty-state">Nenhum livro encontrado. Tente outro termo ou cadastre novos livros em “Meus Livros”.</div>
    <?php else: ?>
        <div class="bv-books-grid">
            <?php foreach($livros as $livro): ?>
                <?php require __DIR__ . '/partials/_livro.php'; ?>
            <?php endforeach; ?>
        </div>
    <?php endif; ?>
</section>