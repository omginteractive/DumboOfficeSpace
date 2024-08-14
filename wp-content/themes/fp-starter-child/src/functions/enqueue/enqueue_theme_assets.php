<?php

function fpstc_enqueue_theme_styles_scripts() {
  fp_enqueue_style('theme-bundle-css', get_theme_file_path('build/css/bundle.css'));
  fp_enqueue_style('custom-panels-css', get_theme_file_path('build/custom-block-panels/bundle.css'));
  fp_enqueue_script('theme-bundle-js', get_theme_file_path('build/js/bundle.js'), ['jquery']);
}
add_action('wp_enqueue_scripts', 'fpstc_enqueue_theme_styles_scripts', 10, 0);

/**
 * Enqueue Editor assets.
 */
function fpstc_enqueue_editor_assets() {
  // Custom Panels JS
  fp_enqueue_script(
    'custom-panels-js',
    get_theme_file_path('build/custom-block-panels/bundle.js'),
    ['wp-blocks', 'wp-dom-ready', 'wp-edit-post'],
    true,
  );
  // Custom Panels CSS
  fp_enqueue_style('custom-panels-css', get_theme_file_path('build/custom-block-panels/bundle.css'));
}
add_action('enqueue_block_editor_assets', 'fpstc_enqueue_editor_assets', 10, 0);

