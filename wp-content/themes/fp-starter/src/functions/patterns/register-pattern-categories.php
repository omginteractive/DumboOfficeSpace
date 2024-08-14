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
function fpst_register_block_categories() {
  register_block_pattern_category('fpst-content', [
    'label' => esc_html__('Fpst Content', 'fpst'),
  ]);
}
add_action('init', 'fpst_register_block_categories', 9);

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
// function fpst_unregister_patterns() {
//   unregister_block_pattern('pattern_name');
//   unregister_block_pattern_category('category_name');
// }
// add_action('init', 'fpst_unregister_patterns', 10);
