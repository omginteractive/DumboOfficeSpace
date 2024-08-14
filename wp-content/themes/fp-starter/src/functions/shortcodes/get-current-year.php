<?php
function get_current_year_shortcode () {
$year = date_i18n ('Y');
return $year;
}
add_shortcode ('get_current_year', 'get_current_year_shortcode');