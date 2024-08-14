<?php


//this will enqueue the parent theme's stylesheet, otherwise it won't be loaded
add_action( 'wp_enqueue_scripts', 'fpstc_theme_enqueue_style' );

function fpstc_theme_enqueue_style() {
	fp_enqueue_style( 
		'fpstc-starter-style', 
		get_theme_file_path( 'style.css' )
	);
}