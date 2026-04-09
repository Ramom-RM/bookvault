<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>BookVault</title>
    <link rel="stylesheet" href="/assets/css/style.css">
</head>
<body>
    
    <?php require __DIR__ . '/../../../includes/header.php'; ?>

    <div class="bv-page-body">
        <?php require __DIR__ . '/../../../includes/sidebar.php'; ?>

        <div class="bv-content">
            <?php if ($mensagem = flash()->get('mensagem')): ?>
                <div class="bv-alert">
                    <?= $mensagem ?>
                </div>
            <?php endif; ?>

            <?php require __DIR__ . "/../{$view}.view.php" ?>
        </div>
    </div>

    <?php require __DIR__ . '/../../../includes/footer.php'; ?>

</body>
</html>