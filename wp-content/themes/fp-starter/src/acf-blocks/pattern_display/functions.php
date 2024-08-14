<?php
//This file is included once and should hold all the functions for the block
function get_block_pattern_names_list() {
  $categories_string = get_field('pattern_categories');
  $categories_array = explode(',', $categories_string);
  $response = [];
  $get_patterns = WP_Block_Patterns_Registry::get_instance()->get_all_registered();
  foreach ($categories_array as $category_name) {
    foreach ($get_patterns as $pattern) {
      if (!in_array($category_name, $pattern['categories'])) {
        continue;
      }
      $name = $pattern['name'];
      $title = $pattern['title'];
      $content = $pattern['content'];
      $response[] = [
        'name' => $name,
        'title' => $title,
        'content' => $content,
      ];
    }
  }
  return $response;
}
