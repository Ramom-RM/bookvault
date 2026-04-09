<section class="bv-section">
    <div class="bv-book-detail-header">
        <div class="bv-book-detail-cover">
            <img src="<?= htmlspecialchars($livro->imagem) ?>" alt="Capa de <?= htmlspecialchars($livro->titulo) ?>" class="bv-detail-cover-img">
        </div>

        <div class="bv-book-detail-info">
            <p class="bv-page-badge">Detalhes do livro</p>
            <h1 class="bv-page-title"><?= htmlspecialchars($livro->titulo) ?></h1>
            <p class="bv-book-author-large"><?= htmlspecialchars($livro->autor) ?> · <?= htmlspecialchars($livro->ano_de_lancamento) ?></p>
            
            <div class="bv-book-rating">
                <div class="bv-rating-stars">
                    <?php for ($i = 1; $i <= 5; $i++): ?>
                        <span class="bv-star <?= $i <= round($livro->nota_avaliacao ?? 0) ? 'bv-star-filled' : 'bv-star-empty' ?>">★</span>
                    <?php endfor; ?>
                </div>
                <div class="bv-rating-text"><?= round($livro->nota_avaliacao ?? 0, 1) ?>/5.0 (<?= intval($livro->count_avaliacoes) ?> avaliações)</div>
            </div>

            <p class="bv-book-description-large"><?= htmlspecialchars($livro->descricao) ?></p>
            
            <a href="/" class="bv-button">← Voltar à estante</a>
        </div>
    </div>
</section>

<section class="bv-section">
    <div class="bv-reviews-header">
        <div>
            <p class="bv-page-badge">Avaliações</p>
            <h2 class="bv-page-title">O que os leitores dizem</h2>
            <p class="bv-page-description">Leia as avaliações de quem já leu este livro.</p>
        </div>
    </div>

    <div class="bv-reviews-layout">
        <div class="bv-reviews-list">
            <?php if (! count($avaliacoes)): ?>
                <div class="bv-empty-state">Nenhuma avaliação ainda. Seja o primeiro a avaliar este livro!</div>
            <?php else: ?>
                <div class="bv-reviews-grid">
                    <?php foreach($avaliacoes as $avaliacao): ?>
                        <?php require __DIR__ . '/partials/_avaliacao.php'; ?>
                    <?php endforeach; ?>
                </div>
            <?php endif; ?>
        </div>

        <?php if (auth()): ?>
            <div class="bv-review-form">
                <div class="bv-card">
                    <div class="bv-card-header">
                        <h3>Me conte o que achou!</h3>
                        <p class="bv-card-subtitle">Compartilhe sua avaliação deste livro.</p>
                    </div>

                    <?php if ($validacoes = flash()->get('validacoes')): ?>
                        <div class="bv-alert" style="background: rgba(239, 68, 68, 0.1); border-color: rgba(239, 68, 68, 0.3); color: #ef4444;">
                            <ul style="margin: 0; padding-left: 1.2rem;">
                                <?php foreach ($validacoes as $validacao): ?>
                                    <li><?= htmlspecialchars($validacao) ?></li>
                                <?php endforeach; ?>
                            </ul>
                        </div>
                    <?php endif; ?>

                    <form class="bv-review-form-body" method="POST" action="/avaliacao-criar">
                        <input name="livro_id" value="<?= $livro->id ?>" type="hidden">

                        <div class="bv-form-group bv-form-group-full">
                            <label class="bv-form-label" for="nota">Sua nota</label>
                            <div class="bv-star-input">
                                <?php for ($i = 1; $i <= 5; $i++): ?>
                                    <label class="bv-star-label">
                                        <input type="radio" name="nota" value="<?= $i ?>" <?= $i === 5 ? 'checked' : '' ?>>
                                        <span class="bv-star-value">★</span>
                                    </label>
                                <?php endfor; ?>
                            </div>
                        </div>

                        <div class="bv-form-group bv-form-group-full">
                            <label class="bv-form-label" for="avaliacao">Seu comentário</label>
                            <textarea id="avaliacao" name="avaliacao" class="bv-textarea" placeholder="Compartilhe seus pensamentos sobre este livro..."></textarea>
                        </div>

                        <button type="submit" class="bv-button-primary">Publicar avaliação</button>
                    </form>
                </div>
            </div>
        <?php else: ?>
            <div class="bv-review-form">
                <div class="bv-card bv-empty-form">
                    <p class="bv-empty-form-text"><a href="/login" class="bv-link">Faça login</a> para avaliar este livro.</p>
                </div>
            </div>
        <?php endif; ?>
    </div>
</section>
