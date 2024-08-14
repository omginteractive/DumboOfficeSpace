<?php
/**
 * Functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package fpst
 * @since 1.0.0
 */

// Include all php files from the 'functions/ */' directory. json file is being created by mix
$json_of_src_functions_php_files = __DIR__ . '/build/fpst/existing-php-functions.json';
$file_exists = file_exists($json_of_src_functions_php_files);
if (!$file_exists) {
  echo 'The build file does not exist. Have you run npm run watch in the child theme? Please check to make sure node is running and the build is successful: ' . $json_of_src_functions_php_files;
}
$php_files = file_get_contents($json_of_src_functions_php_files);
$php_files_array = json_decode($php_files, true);
foreach ($php_files_array as $file) {
  $file_location = __DIR__ . '/src/functions/' . $file;
  if (!file_exists($file_location)) {
    continue;
  } //skip if file does not exist. This would happen if the file exists on a local environment but not on the server due to files not being committed yet.
  require_once $file_location;
}
/* IMPORTANT: DO NOT ADD ANYTHING TO THIS FILE */
