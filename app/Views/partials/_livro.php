<article class="bv-book-card">
    <div class="bv-book-cover-wrapper">
        <img src="<?= htmlspecialchars($livro->imagem) ?>" alt="Capa de <?= htmlspecialchars($livro->titulo) ?>" class="bv-book-cover">
    </div>

    <div class="bv-book-content">
        <div class="bv-book-header">
            <a href="/livro?id=<?= $livro->id ?>" class="bv-book-title"><?= htmlspecialchars($livro->titulo) ?></a>
            <p class="bv-book-author"><?= htmlspecialchars($livro->autor) ?> · <?= htmlspecialchars($livro->ano_de_lancamento) ?></p>
        </div>

        <p class="bv-book-description"><?= htmlspecialchars(mb_strimwidth($livro->descricao, 0, 180, '...')) ?></p>

        <div class="bv-book-meta">
            <span class="bv-badge">Avaliação <?= round($livro->nota_avaliacao ?: 0, 1) ?></span>
            <span class="bv-badge"><?= intval($livro->count_avaliacoes) ?> avaliações</span>
        </div>

        <div class="bv-book-actions">
            <a href="/livro?id=<?= $livro->id ?>" class="bv-button">Ver detalhes</a>
            <?php if (auth() && auth()->id === $livro->usuario_id): ?>
                <a href="/livro-editar?id=<?= $livro->id ?>" class="bv-button bv-button-primary">Editar</a>
            <?php endif; ?>
        </div>
    </div>
</article>
