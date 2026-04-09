<aside class="bv-sidebar">
    <div class="bv-sidebar-inner">
        <div class="bv-sidebar-title">Navegação</div>

        <nav class="bv-sidebar-nav">
            <a href="/dashboard" class="bv-sidebar-link">Dashboard</a>
            <a href="/" class="bv-sidebar-link">Explorar</a>
            <?php if (auth()): ?>
                <a href="/meus-livros" class="bv-sidebar-link">Meus Livros</a>
            <?php endif; ?>
            <a href="/login" class="bv-sidebar-link"><?php echo auth() ? 'Perfil' : 'Entrar / Registrar'; ?></a>
        </nav>

        <div class="bv-sidebar-footer">
            <p>BookVault</p>
            <span>Organize seus livros com estilo.</span>
        </div>
    </div>
</aside>
