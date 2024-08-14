<?php
/**
 * Registers block pattern categories.
 *
 * @since 1.0.0
 *
 * @return void
 */

//Add new pattern categories here
// See docs https://developer.wordpress.org/reference/functions/register_block_pattern_category/
function fpstc_register_block_categories() {
  $text_domain = 'fpstc';
  register_block_pattern_category('fpstc-content', [
    'label' => esc_html__('Fpstc Content', $text_domain),
  ]);
}
add_action('init', 'fpstc_register_block_categories', 9);

/**
 * This is an example of how to unregister a core block pattern and a block pattern category.
 * Must be called after the patterns and pattern categories that you want to unregister have been added.
 *
 * @see https://developer.wordpress.org/reference/functions/unregister_block_pattern/
 * @see https://developer.wordpress.org/reference/functions/unregister_block_pattern_category/
 *
 * @since 1.0.0
 *
 * @return void
 */
// function fpstc_unregister_patterns() {
//   unregister_block_pattern('pattern_name');
//   unregister_block_pattern_category('category_name');
// }
// add_action('init', 'fpstc_unregister_patterns', 10);
