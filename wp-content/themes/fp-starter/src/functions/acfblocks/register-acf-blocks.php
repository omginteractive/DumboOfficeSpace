<?php

function fpst_register_acf_blocks() {
  if (!class_exists('ACF')) {
    return; //dont continue if ACF is not active
  }
  // ACF Blocks directory in child theme
  $dir = get_stylesheet_directory() . '/src/acf-blocks';
  $dir_list = [];

  // Create iterator
  $iterator = new RecursiveIteratorIterator(
    new RecursiveDirectoryIterator($dir, RecursiveDirectoryIterator::SKIP_DOTS),
    RecursiveIteratorIterator::SELF_FIRST,
  );
  foreach ($iterator as $file) {
    $path = $file->getRealPath();
    // Add directories to directory list
    if ($file->isDir()) {
      $dir_list[] = $path;
    } elseif ($file->isFile()) {
      // Require all functions.php files
      if ($file->getExtension() === 'php' && $file->getBasename('.php') === 'functions') {
        require_once $path;
      } elseif (
        $file->getExtension() === 'json' &&
        ($file->getBasename('.json') === 'fields' || $file->getBasename('.json') === 'acf-fields')
      ) {
        // Register ACF field groups & custom post types
        $acf_fields_json_string = file_get_contents($path);
        $acf_fields_json = json_decode($acf_fields_json_string, true);

        foreach ($acf_fields_json as $acf_fields) {
          $is_cpt = array_key_exists('post_type', $acf_fields);
          if ($is_cpt) {
            $post_type = $acf_fields['post_type'];
            register_post_type($post_type, $acf_fields);
          } else {
            acf_add_local_field_group($acf_fields);
          }
        }
      }
    }
  }

  // Register script handles. Needs to be called before block registration
  if (has_action('register_acf_script_handles')) {
    do_action('register_acf_script_handles');
  }

  // Register the blocks
  foreach ($dir_list as $block_dir) {
    register_block_type($block_dir);
  }
}
add_action('init', 'fpst_register_acf_blocks', 10, 1);
