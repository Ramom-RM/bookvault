<div class="bv-card bv-book-form">
    <div class="bv-book-form-header">
        <div>
            <p class="bv-page-badge"><?= $livro ? 'Editar livro' : 'Adicionar novo livro' ?></p>
            <h2 class="bv-page-title"><?= $livro ? 'Atualize os dados do livro' : 'Cadastre sua nova aquisição' ?></h2>
            <p class="bv-page-description">Use este formulário para registrar um livro ou atualizar seus dados no BookVault.</p>
        </div>
    </div>

    <?php if ($validacoes = flash()->get('validacoes')): ?>
        <div class="bv-alert">
            <ul>
                <?php foreach ($validacoes as $validacao): ?>
                    <li><?= htmlspecialchars($validacao) ?></li>
                <?php endforeach; ?>
            </ul>
        </div>
    <?php endif; ?>

    <form class="bv-book-form-grid" method="POST" action="<?= $action ?>" enctype="multipart/form-data">
        <?php if (! empty($livro->id)): ?>
            <input type="hidden" name="id" value="<?= $livro->id ?>">
        <?php endif; ?>

        <div class="bv-upload-card">
            <div class="bv-upload-icon">📁</div>
            <div>
                <p class="bv-upload-title">Upload da capa</p>
                <p class="bv-upload-description">Envie a imagem do livro em JPG ou PNG.</p>
            </div>
            <input type="file" name="imagem" class="bv-input-file">
            <?php if (! empty($livro->imagem)): ?>
                <img src="<?= htmlspecialchars($livro->imagem) ?>" alt="Capa atual" class="bv-upload-preview">
            <?php endif; ?>
        </div>

        <div class="bv-book-form-fields">
            <div class="bv-form-group">
                <label class="bv-form-label" for="titulo">Título</label>
                <input id="titulo" type="text" name="titulo" value="<?= htmlspecialchars($livro->titulo ?? '') ?>" class="bv-input" placeholder="Cem Anos de Solidão">
            </div>

            <div class="bv-form-group">
                <label class="bv-form-label" for="autor">Autor</label>
                <input id="autor" type="text" name="autor" value="<?= htmlspecialchars($livro->autor ?? '') ?>" class="bv-input" placeholder="Gabriel García Márquez">
            </div>

            <div class="bv-form-group">
                <label class="bv-form-label" for="ano_de_lancamento">Ano de lançamento</label>
                <input id="ano_de_lancamento" type="number" name="ano_de_lancamento" value="<?= htmlspecialchars($livro->ano_de_lancamento ?? '') ?>" class="bv-input" placeholder="1967">
            </div>

            <div class="bv-form-group bv-form-group-full">
                <label class="bv-form-label" for="descricao">Descrição</label>
                <textarea id="descricao" name="descricao" rows="6" class="bv-textarea" placeholder="Escreva um breve resumo do livro..."><?= htmlspecialchars($livro->descricao ?? '') ?></textarea>
            </div>

            <div class="bv-actions-row">
                <a href="/meus-livros" class="bv-button">Cancelar</a>
                <button type="submit" class="bv-button-primary">Salvar Livro</button>
            </div>
        </div>
    </form>
</div>
