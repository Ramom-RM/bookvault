<header class="bv-header">
    <div class="bv-header-inner">
        <div class="bv-brand">
            <a href="/">BookVault</a>
            <span>Biblioteca digital</span>
        </div>

        <nav class="bv-topnav">
            <a href="/">Explorar</a>
            <?php if (auth()): ?>
                <a href="/meus-livros">Meus Livros</a>
            <?php endif; ?>
        </nav>

        <div class="bv-user">
            <?php if (auth()): ?>
                <a href="/logout">Oi, <?= auth()->nome ?></a>
            <?php else: ?>
                <a href="/login">Fazer login</a>
            <?php endif; ?>
        </div>
    </div>
</header>
