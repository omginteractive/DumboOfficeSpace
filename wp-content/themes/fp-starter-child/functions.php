<?php

/**
 * Functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package fpstc
 * @since 1.0.0
 */

//include parent theme functions
require_once get_template_directory() . '/functions.php';

// Include all php files from the 'functions/ */' directory. json file is being created by mix
$json_of_src_functions_php_files = __DIR__ . '/build/fpstc/existing-php-functions.json';
$file_exists = file_exists($json_of_src_functions_php_files);
if (!$file_exists) {
  echo 'The build file does not exist, check to make sure node is running and the build is successful: ' . $json_of_src_functions_php_files;
}
$php_files = file_get_contents($json_of_src_functions_php_files);
$php_files_array = json_decode($php_files, true);
foreach ($php_files_array as $file) {
  $file_location = __DIR__ . '/src/functions/' . $file;
  //check if exists before require
  if (!file_exists($file_location)) {
    continue;
  } //skip if file does not exist. This would happen if the file exists on a local environment but not on the server due to files not being committed yet.
  require_once $file_location;
}
/* IMPORTANT: DO NOT ADD ANYTHING TO THIS FILE */
