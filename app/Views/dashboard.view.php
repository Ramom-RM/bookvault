<section class="bv-section">
    <div class="bv-page-header">
        <div>
            <p class="bv-page-badge">Dashboard</p>
            <h1 class="bv-page-title">Bem-vindo de volta, <?= htmlspecialchars(auth()->nome) ?></h1>
            <p class="bv-page-description">Visão geral da sua biblioteca, avaliações e progresso recente.</p>
        </div>
    </div>

    <div class="bv-stats-grid">
        <article class="bv-stat-card">
            <div class="bv-stat-icon">📚</div>
            <p class="bv-stat-label">Total de livros</p>
            <p class="bv-stat-value"><?= $totalLivros ?></p>
        </article>

        <article class="bv-stat-card">
            <div class="bv-stat-icon">📝</div>
            <p class="bv-stat-label">Total de avaliações</p>
            <p class="bv-stat-value"><?= $totalAvaliacoes ?></p>
        </article>

        <article class="bv-stat-card">
            <div class="bv-stat-icon">⭐</div>
            <p class="bv-stat-label">Média de avaliação</p>
            <p class="bv-stat-value"><?= $mediaAvaliacoes ?: '0.00' ?></p>
        </article>

        <article class="bv-stat-card">
            <div class="bv-stat-icon">📚</div>
            <p class="bv-stat-label">Meus livros</p>
            <p class="bv-stat-value"><?= $quantidadeMeusLivros ?></p>
        </article>
    </div>

    <div class="bv-dashboard-grid">
        <div class="bv-card bv-glass-card">
            <div class="bv-card-header">
                <div>
                    <h2>Leituras recentes</h2>
                    <p class="bv-card-subtitle">Últimos livros adicionados na biblioteca.</p>
                </div>
                <a href="/meus-livros" class="bv-card-link">Ver tudo</a>
            </div>

            <div class="bv-recent-list">
                <?php foreach ($recentBooks as $livro): ?>
                    <article class="bv-recent-item">
                        <img src="<?= htmlspecialchars($livro->imagem) ?>" alt="Capa de <?= htmlspecialchars($livro->titulo) ?>" class="bv-recent-cover">
                        <div class="bv-recent-meta">
                            <a href="/livro?id=<?= $livro->id ?>" class="bv-recent-title"><?= htmlspecialchars($livro->titulo) ?></a>
                            <p class="bv-recent-author"><?= htmlspecialchars($livro->autor) ?> · <?= htmlspecialchars($livro->ano_de_lancamento) ?></p>
                            <div class="bv-progress-bar">
                                <div class="bv-progress-fill" style="width: <?= max(10, min(100, round(($livro->nota_avaliacao / 5) * 100))) ?>%;"></div>
                            </div>
                        </div>
                        <div class="bv-progress-value"><?= round($livro->nota_avaliacao, 1) ?: '0.0' ?> ★</div>
                    </article>
                <?php endforeach; ?>
            </div>
        </div>

        <div class="bv-card bv-glass-card bv-goal-card">
            <div class="bv-card-header">
                <div>
                    <h2>Sua Meta 2026</h2>
                    <p class="bv-card-subtitle">Acompanhe o progresso dos seus livros.</p>
                </div>
            </div>

            <div class="bv-goal-ring">
                <div class="bv-goal-progress" style="--progress: <?= intval(($metaConcluida / $metaTotal) * 100) ?>%;"></div>
                <div class="bv-goal-value"><?= $metaConcluida ?>/<?= $metaTotal ?></div>
            </div>

            <p class="bv-goal-text">
                <?= $metaConcluida >= $metaTotal ? 'Meta alcançada! Parabéns.' : 'Faltam ' . ($metaTotal - $metaConcluida) . ' livros para atingir a meta.' ?>
            </p>
        </div>
    </div>
</section>
