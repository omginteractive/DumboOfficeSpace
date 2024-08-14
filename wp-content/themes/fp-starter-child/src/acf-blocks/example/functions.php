<?php
function register_custom_block_scripts($arg){
  wp_register_script('example-js', get_stylesheet_directory_uri() . '/build/acf-blocks/example.js', ['jquery'], null);
}
add_action('register_acf_script_handles', 'register_custom_block_scripts', 10, 1);