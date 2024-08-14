# General practices:

## Registering patterns

Add the pattern to the `/patterns` folder, use existing patterns as references.

Pay attention to the comment structure:

```
 * Title: Headline Paragraph
 * Slug: fpstc/headline-paragraph
 * Categories: fpstc-content
 * Block Types: omg-search, core/buttons
```

Make sure to use an appropriate category.

If it doesnt exist, add it to `fp-starter-child/src/functions/register-pattern-categories.php`

The file will automatically be enqueued if in the correct place and formatting in the comment is correct.
Note that `fp-starter-child/patterns` is excluded from Prettier formatting due to unwanted line breaks being added by WP.

Note that all patterns are contained within a Gutenberg Group block. For best practice, let's make sure that each parent group of each pattern has a class identifier. For example:
`<div class="wp-block-group alignfull fpstc-hero-images">`

## Styles

The `src/scss/patterns` folder is set up so each pattern should have its own corresponding stylesheet, webpack is setup for it as well as the enqueuing structure

## Block settings

### Avoid inline style settings

Please be careful about changing the default block settings that add inline styles.
In the block editor, changes to some options including padding, margins, lineheight, and others will be set with inline CSS which will make responsive styling difficult.
It will generally be unnecessary to set these values in the editor.
An example where it could be used is when applying a background color to a Group block. This may be acceptable if it is not problematic for responsive styling.

### Use class-based settings

All custom block settings that we created are fine to use because they apply a class to the block instead of using inline styles.
Buttons - width and style
Paragraph - Uppercase
Columns - Toggle reverse
Image - Aspect ratio and border radius
Heading - Font sizes

### Responsive spacing

For responsive spacing use scss vars:
padding-top `$space-r-14;`
This will apply the value of `$space-14` and incrementally reduce that space for smaller screens.
For more info refer to `theme.json`

### Tag-based changes

Such as changing `<h1>` to `<h2>`
These should be fine as they can be overridden through media queries as needed.

### Adding classes through Advanced block options

It is ok to add classes to the blocks and style through scss, but do so only as needed.

For example if there is one heading in a pattern you can use `.fpstc-patternname .wp-block-heading {}` to select that element. It wont be necessary to add an additional class.

But if there are multiple Image elements in a pattern it might be necessary to use different classes to differentiate them:
`.fpstc-patternname .logo {} `
`.fpstc-patternname .featured-image {} `

### Group sizing

The group block's default content width is `1000px` and wide width is `1200px`, but there is a Full Width Group block that can be used instead.
The full width attribute can be toggled by clicking on the full width group and clicking the align full option in the block's mini toolbar

### Inner block width

This setting exists in groups and columns and it is important to understand how this affects the layout.

The following blocks use the inner block width control: Query loop, group, post content, cover, media & text, and column. However, different blocks also start with different default values.

To find this setting in the group block in the Site Editor look for “Inner blocks use content width”

#### When Inner blocks use content width is toggled on:

The default width of the inner blocks is the value that your theme has assigned as the contentWidth in theme.json.
You can specify the width of the inner blocks using the input fields in the layout panel.
You can justify the blocks to the left, center, or right.

#### When Inner blocks use content width is toggled off:

The content width options in the layout panel are unavailable.
The inner blocks are always justified to the left (on ltr) and fill the width of the parent block.

## Mobile styling:

There is none in the Figma, so a lot of this depends on your best judgement.
Font sizes are responsive, and responsive spacing options exist.
Stack things that are too wide for smaller screens.
Use the pattern's parent class mentioned below with scss for responsive changes.

Responsively, ensure that mobile through large desktop looks good, paying special attention to the transition around 767px/768px.
Reduced padding should be necessary for smaller screens.
On small screens, a side padding of 16px should be applied to make sure the content doesnt bump into the edges. Use a $space- sass var to apply this.
