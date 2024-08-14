<?php

//This will display a list of recommended plugins that are not installed or activated when on the plugins page

function check_required_plugins() {
  if (!function_exists('get_current_screen')) {
    require_once ABSPATH . 'wp-admin/includes/screen.php';
  }

  $screen = get_current_screen();
  if ($screen->id != 'plugins') {
    return; // Not the plugins page, do nothing
  }

  class PluginManager {
    private $allPlugins = [];

    public function addPlugin($plugin_file, $custom_url = false, $license_required = false) {
      $this->allPlugins[] = [
        'file' => $plugin_file,
        'url' => $custom_url,
        'license' => $license_required,
      ];
    }

    public function getAllPlugins() {
      return $this->allPlugins;
    }
  }
  $pluginManager = new PluginManager();
  $pluginManager->addPlugin('advanced-cron-manager/advanced-cron-manager.php');
  $pluginManager->addPlugin('custom-typekit-fonts/custom-typekit-fonts.php');
  $pluginManager->addPlugin('safe-svg/safe-svg.php');
  $pluginManager->addPlugin('simple-history/index.php');
  $pluginManager->addPlugin('advanced-cron-manager-pro/advanced-cron-manager-pro.php', false, true);
  $pluginManager->addPlugin('advanced-custom-fields-pro/acf.php', false, true);
  $pluginManager->addPlugin('gravityforms/gravityforms.php', false, true);
  $pluginManager->addPlugin('omg-search/omg-apartment-search.php', 'https://github.com/omginteractive/omg-search/');
  $pluginManager->addPlugin('omg-feeds/omg-feeds.php', 'https://github.com/omginteractive/omg-feeds/');
  $allPlugins = $pluginManager->getAllPlugins();

  $not_installed = [];
  foreach ($allPlugins as $plugin) {
    if (!is_plugin_active($plugin['file']) && !file_exists(WP_PLUGIN_DIR . '/' . $plugin['file'])) {
      $not_installed[] = $plugin['file'];
    }
  }

  function getPluginDataByFile($allPlugins, $file) {
    foreach ($allPlugins as $plugin) {
      if ($plugin['file'] === $file) {
        return $plugin;
      }
    }
    return null;
  }
  if (!empty($not_installed)) {
    add_action('admin_notices', function () use ($not_installed, $allPlugins) {
      echo '<div class="notice notice-warning is-dismissible">';
      echo '<p><strong>Missing Plugins:</strong> The following are plugins we commonly use:</p>';
      echo '<ul>';
      foreach ($not_installed as $file) {
        $pluginData = getPluginDataByFile($allPlugins, $file);
        $plugin_slug = dirname($file);
        $plugin_name = ucwords(str_replace('-', ' ', $plugin_slug));
        $admin_url = $pluginData['url'] ? $pluginData['url'] : admin_url('plugin-install.php?tab=search&s=' . $plugin_slug);

        $hasLicense = $pluginData['license'];
        $licenseNotice = $hasLicense ? ' (License Required)' : '';
        echo '<li>' . $plugin_name . " - <a href='" . $admin_url . "'>Install Now</a>" . $licenseNotice . '</li>';
      }
      echo '</ul>';
      echo '</div>';
    });
  }
}

function check_if_plugins_page() {
  $screen = get_current_screen();
  if ($screen->id === 'plugins') {
    check_required_plugins();
  }
}

add_action('current_screen', 'check_if_plugins_page');
