## Child theme

Child themes are extensions of a parent theme. They allow you to modify an existing theme without directly editing that theme’s code. They are often something as simple as a few minor color changes, but they can also be complex and include custom overrides of the parent theme.

## Overwriting

When building a child theme, you have the option to overwrite any template, part, or pattern that exists in the parent theme by adding a file of the same name in your child theme. Note: patterns must also have the same registered Slug field.

This means only items in the parent's templates, parts, or patterns folders will be overwritten. If the parent has a functions/ folder then the child theme wont affect it.

You can also add brand new templates, parts, and patterns to your child theme, even if they don’t exist in the parent. To learn more about these features, refer to these articles in the handbook:

Templates - https://developer.wordpress.org/themes/templates/
Patterns - https://developer.wordpress.org/themes/features/block-patterns/

## Functions.php

Unlike templates and patterns, the functions.php file of a child theme does not override the functions.php file in the parent theme. In fact, they are both loaded, with the child being loaded immediately before the parent.

## Theme.json

When both the parent theme and the child theme include theme.json:

The child theme inherits all features from the parent theme.json.
The child theme.json overrides the parent by duplicating styles and settings.

Settings and styles in the child theme.json replace the equivalent in the parent; it is not possible to make partial edits: If the child theme.json includes a color palette, this completely replaces the parent’s color palette. So even if you want to replace a single color, you must copy the whole palette from theme.json.

Similarly, a child theme inherits the parent theme style variations. There is no way for a child theme to remove a parent theme style variation, only override it. For example, to override the
“Pitch” style variation in a Twenty Twenty-Three child theme, you would include your own styles/pitch.json file.
