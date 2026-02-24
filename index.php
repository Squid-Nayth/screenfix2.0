<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo( 'charset' ); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php wp_title('|', true, 'right'); ?></title>
    <link rel="profile" href="https://gmpg.org/xfn/11">
    
    <!-- Google Fonts Preload -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
    
    <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
    
    <!-- Đây là nơi React App sẽ được render vào -->
    <div id="screenfix-app-root"></div>

    <?php wp_footer(); ?>
</body>
</html>
