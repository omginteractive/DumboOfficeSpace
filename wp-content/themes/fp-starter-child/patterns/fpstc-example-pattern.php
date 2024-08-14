<?php
/**
 * Title: Text Image Row
 * Slug: fpstc/text-image-row
 * Categories: fpstc-content
 * Block Types: core/group core/columns core/column core/image core/heading core/paragraph core/buttons core/button
 *
 * @package fpstc
 * @since 1.0.0
 * 
 * https://developer.wordpress.org/themes/features/block-patterns/
 * Old docs: https://developer.wordpress.org/themes/advanced-topics/block-patterns/
 * 
 * Patterns are set to not autoformat with prettier because the new lines added turn into <br> in WP
 */
?>
<!-- wp:group {"tagName":"section","className":"text-image-row","layout":{"type":"constrained"},"metadata":{"name":"Text Image Row Section"},"customMaxWidth":""} -->
<section class="wp-block-group text-image-row"><!-- wp:columns {"align":"full","className":""} -->
<div class="wp-block-columns alignfull"><!-- wp:column {"className":"text-image-row__content-col"} -->
<div class="wp-block-column text-image-row__content-col"><!-- wp:image {"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://placehold.co/728x600" alt=""/></figure>
<!-- /wp:image --></div>
<!-- /wp:column -->

<!-- wp:column {"className":"text-image-row__text-col"} -->
<div class="wp-block-column text-image-row__text-col"><!-- wp:group {"tagName":"article","className":"custom-max-width-md text-image-row__text","layout":{"type":"constrained"}} -->
<article class="wp-block-group custom-max-width-md text-image-row__text"><!-- wp:paragraph {"style":{"typography":{"textTransform":"uppercase"}},"className":"eyebrow"} -->
<p class="eyebrow" style="text-transform:uppercase">Insert Eyebrow Text</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading">Insert Header Text</h3>
<!-- /wp:heading -->

<!-- wp:paragraph {"className":"copy"} -->
<p class="copy">Insert Copy Text</p>
<!-- /wp:paragraph -->

<!-- wp:buttons {"className":"custom-width-dynamic custom-type-primary custom-icon-cross is-style-outline"} -->
<div class="wp-block-buttons custom-width-dynamic custom-type-primary custom-icon-cross is-style-outline"><!-- wp:button {"className":"custom-width-dynamic custom-type-primary is-style-fill"} -->
<div class="wp-block-button custom-width-dynamic custom-type-primary is-style-fill"><a class="wp-block-button__link wp-element-button">Insert button text</a></div>
<!-- /wp:button --></div>
<!-- /wp:buttons --></article>
<!-- /wp:group --></div>
<!-- /wp:column --></div>
<!-- /wp:columns --></section>
<!-- /wp:group -->