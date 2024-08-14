# ACF Custom Blocks

https://www.advancedcustomfields.com/resources/blocks/

The folders in this directory contain custom blocks

By adding a folder here with the correct structure, it will automatically be enqueued

### Common files and naming conventions

acfblocks/blockname -> Directory containing all block files
acfblocks/blockname/fields.json -> Generated json output for creating ACF fields
acfblocks/blockname/block.json -> Block config file
acfblocks/blockname/blockname.php -> Main block output for frontend and backend
acfblocks/blockname/blockname.scss -> SCSS file which will be compiled automatically
acfblocks/blockname/blockname.ts -> TS file which will be compiled automatically

### Block Variables (or Parameters for Callbacks) in PHP

You have access to data about your block by default when creating an ACF Block, either by variables made available in your template or passed into your callback as parameters. New parameters are defined in exactly the same way as any other PHP template file.

`$block` (array) The block settings and attributes.
`$content` (string) The block inner HTML (empty).
`$is_preview` (boolean) True during backend preview render, i.e., when rendering inside the block editor’s content, or rendered inside the block editor when adding a new block, showing a preview when hovering over the new block. This variable is only set to true when is_admin() and current screen is_block_editor() both return true.
`$context` (array) The context provided to the block by the post or its parent block.

### Block.json Structure

The general block.json structure. It can be modified except for a couple of important caveats.

1. Style must use file with path to the build version of the blocks scss file.
2. ViewScript must use a handle

```
{
  "name": "acf/block-name",
  "title": "Block Name",
  "description": "A custom block that uses ACF fields.",
  "style": ["file:../../build/blocks/block-name/block-name.css"],
  "viewScript": ["block-name-js"],
  "category": "formatting",
  "icon": "admin-comments",
  "keywords": ["keyword", "keyword"],
  "acf": {
    "mode": "auto",
    "renderTemplate": "block-name.php"
  }
}
```

### Functions.php Structure

The following code must exist in every custom block's functions.php file that utilizes Typescript/Javascript. The 'dependency' array is an array of any dependencies the script relies on, for example 'jquery', 'heartbeat', etc. See [examples](https://developer.wordpress.org/reference/functions/wp_register_script/).

```
function register_custom_block_scripts($arg){
  wp_register_script('block-name-js', get_stylesheet_directory_uri() . '/build/blocks/block-name/block-name.js', ['dependency'], null);
}
add_action('register_acf_script_handles', 'register_custom_block_scripts', 10, 1);
```
