<article class="bv-review-card">
    <div class="bv-review-header">
        <div>
            <p class="bv-review-user"><?= htmlspecialchars($avaliacao->usuario_nome ?? 'Usuário') ?></p>
            <p class="bv-review-date">Sem data registrada</p>
        </div>
        <div class="bv-review-stars">
            <?php for ($i = 1; $i <= 5; $i++): ?>
                <span class="bv-star <?= $i <= $avaliacao->nota ? 'bv-star-filled' : 'bv-star-empty' ?>">★</span>
            <?php endfor; ?>
        </div>
    </div>

    <div class="bv-review-content">
        <p class="bv-review-text">"<?= htmlspecialchars($avaliacao->avaliacao) ?>"</p>
    </div>

    <div class="bv-review-footer">
        <button class="bv-review-action">👍 Útil</button>
    </div>
</article>
