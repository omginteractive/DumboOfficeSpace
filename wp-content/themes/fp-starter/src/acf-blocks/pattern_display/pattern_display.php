<?php
$class_name = 'mb-pattern-display';
include_once 'functions.php';
/**
 * Press Posts Block template.
 *
 * @param array $block The block settings and attributes.
 */

$post_type_slug = get_field('post_type_slug'); // ACF's color picker.
$number_of_results = get_field('number_of_results'); // ACF's color picker.

// Support custom "anchor" values.
$anchor = '';
if (!empty($block['anchor'])) {
  $anchor = 'id="' . esc_attr($block['anchor']) . '" ';
}

// Create class attribute allowing for custom "className" and "align" values.
if (!empty($block['className'])) {
  $class_name .= ' ' . $block['className'];
}

$all_registered_patterns = get_block_pattern_names_list();
?>
<div <?php echo esc_attr($anchor); ?>class="<?php echo esc_attr($class_name); ?>">
    <?php if (!count($all_registered_patterns)) {
      echo 'No patterns found for pattern category: ' . get_field('pattern_categories');
    } ?>
    <?php foreach ($all_registered_patterns as $pattern): ?>
        <div class="mb-pattern_display__item">
            <div class='title'>
                <?php echo $pattern['title'] . ' || ' . $pattern['name']; ?>
            </div>
            <?php
            $parsed_blocks = parse_blocks($pattern['content']);

            if ($parsed_blocks) { ?>
                <div class="mb-pattern_display__block">
                    <?php foreach ($parsed_blocks as $block) {
                      echo apply_filters('the_content', render_block($block));
                    } ?>
                </div>
                <?php }
            ?>
        </div>
    <?php endforeach; ?>
</div>