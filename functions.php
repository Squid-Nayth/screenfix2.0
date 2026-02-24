<?php
/**
 * ScreenFix Theme Functions
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

function screenfix_theme_scripts() {
    // 1. Tải Tailwind CSS (Khuyên dùng build process cho production, ở đây dùng CDN cho tiện lợi)
    wp_enqueue_script('screenfix-tailwind', 'https://cdn.tailwindcss.com', array(), null, false);
    
    // Config Tailwind
    wp_add_inline_script('screenfix-tailwind', "
      tailwind.config = {
        theme: {
          extend: {
            fontFamily: { sans: ['Inter', 'sans-serif'] },
            colors: {
              brand: { blue: '#007AFF', dark: '#1D1D1F' }
            },
            animation: {
              'blob': 'blob 7s infinite',
              'float': 'float 6s ease-in-out infinite',
              'fade-in': 'fadeIn 0.5s ease-out forwards',
              'bounce-slow': 'bounce 3s infinite',
            },
            keyframes: {
              blob: {
                '0%': { transform: 'translate(0px, 0px) scale(1)' },
                '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
                '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
                '100%': { transform: 'translate(0px, 0px) scale(1)' },
              },
              float: {
                '0%, 100%': { transform: 'translateY(0)' },
                '50%': { transform: 'translateY(-20px)' },
              },
              fadeIn: {
                '0%': { opacity: '0', transform: 'translateY(10px)' },
                '100%': { opacity: '1', transform: 'translateY(0)' },
              }
            }
          },
        },
      }
    ");

    // 2. Load React & ReactDOM (ESM via CDN for this environment)
    // Lưu ý: Với theme production, bạn nên build ra file main.js duy nhất.
    wp_enqueue_script('screenfix-react', 'https://esm.sh/react@19.2.3', array(), null, true);
    wp_enqueue_script('screenfix-react-dom', 'https://esm.sh/react-dom@19.2.3', array('screenfix-react'), null, true);

    // 3. Load Main App logic
    // Giả lập load script chính. Trong môi trường thực tế, bạn trỏ vào file build: /assets/js/main.js
    // get_template_directory_uri() trỏ về thư mục theme hiện tại.
    $theme_url = get_template_directory_uri();
    
    wp_register_script('screenfix-app-core', false);
    
    // Truyền biến URL vào JS để component Training.tsx tải ảnh đúng chỗ
    wp_localize_script('screenfix-app-core', 'SCREENFIX_ASSETS_URL', $theme_url . '/assets/');
    wp_enqueue_script('screenfix-app-core');

    // Load file style.css chính của theme
    wp_enqueue_style( 'screenfix-style', get_stylesheet_uri() );
}
add_action( 'wp_enqueue_scripts', 'screenfix_theme_scripts' );

// Hỗ trợ Title Tag
add_theme_support( 'title-tag' );
