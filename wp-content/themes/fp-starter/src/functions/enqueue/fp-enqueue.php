<?php
function convertUrlToPath($url){
    $url = str_replace(get_site_url(), ABSPATH, $url);
    return $url;
}
// convert path to $url
function convertPathToUrl($path){
    $path = str_replace(ABSPATH, trailingslashit(get_site_url()), $path);
    return $path;
}
/**
 * Enqueues a CSS stylesheet in a WordPress theme.
 *
 * This function properly enqueues a CSS stylesheet for use in a WordPress theme.
 * It uses the file modification time for versioning, which helps in cache busting
 * whenever the stylesheet file is updated. This ensures that users always receive
 * the most recent version of the stylesheet.
 *
 * @param string $handle A unique name for the stylesheet. Similar to the handle used in `wp_register_style()`.
 * @param string $src The URL to the stylesheet file.
 * @param array $deps An array of registered stylesheet handles this stylesheet depends on.
 * @param string $media The media for which this stylesheet has been defined. Default 'all'. Accepts media types like 'all', 'print' and 'screen', or media queries like '(orientation: portrait)' and '(max-width: 640px)'.
 */
function fp_enqueue_style($handle, $src = '', $deps = [], $media = 'all'){
    $src_is_path = file_exists($src);
    $version = $src_is_path ? filemtime($src) : filemtime(convertUrlToPath($src));
    $src_to_use = $src_is_path ? convertPathToUrl($src) : $src;
    wp_enqueue_style($handle, $src_to_use, $deps, $version, $media);
}

/**
 * Enqueues a JavaScript file in a WordPress theme.
 *
 * This function properly enqueues a JavaScript file for use in a WordPress theme.
 * It uses the file modification time for versioning, which helps in cache busting
 * whenever the JavaScript file is updated. This ensures that users always receive
 * the most recent version of the JavaScript file.
 *
 * @param string $handle A unique name for the JavaScript file. Similar to the handle used in `wp_register_script()`.
 * @param string $src The URL to the JavaScript file.
 * @param array $deps An array of registered script handles this script depends on.
 * @param string|bool $args Additional arguments for the script. Default empty.
 */
function fp_enqueue_script($handle, $src = '', $deps = [], $args = []){
    $src_is_path = file_exists($src);
    $version = $src_is_path ? filemtime($src) : filemtime(convertUrlToPath($src));
    $src_to_use = $src_is_path ? convertPathToUrl($src) : $src;
    wp_enqueue_script($handle, $src_to_use, $deps, $version, $args);
}