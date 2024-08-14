# FP Starter Theme Child

When making changes to the theme, you should only do so in this folder. The parent theme should never be edited directly. If there is a problem with the parent theme, contact the theme developer.

For an idea of how child themes work, refer to readme-child-themes.md

## Pattern categories

I `/wp-content/themes/fp-starter-child/src/functions/patterns/register-pattern-categories.php` update the `register_block_pattern_category()` function to match your needs

```
function fpstc_register_block_categories() {
  register_block_pattern_category('fpstc-content', [
    'label' => esc_html__('Fpstc Content', 'fpstc'),
  ]);
}
```

You will want to be familiar with this function as you can run it again to create as many pattern categories as you need. To add additional categories, simply add more executions of `register_block_pattern_category()` within `fpstc_register_block_categories()`
