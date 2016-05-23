<?php
/**
 * http://wordpress.org/extend/plugins/settings-api/
 */

require( get_template_directory() . '/inc/settings/class.settings-api.php' );


/**
 * Registers settings section and fields
 */
function bc_admin_init() {

    $sections = array(
        array(
            'id' => 'site_general',
            'title' => __( 'Site Settings', 'bc' )
        ),
    );

    $fields = array(
        'site_general' => array(
            array(
                'name'    => 'about',
                'label'   => __( 'About Text', 'bc' ),
                'desc'    => __( '', 'bc' ),
                'type'    => 'wysiwyg',
                'default' => '',
            ),
            array(
                'name'    => 'about_image',
                'label'   => __( 'About Background', 'bc' ),
                'desc'    => __( '', 'bc' ),
                'type'    => 'file',
                'default' => '',
            ),
        ),
    );

    $settings_api = WeDevs_Settings_API::getInstance();

    //set sections and fields
    $settings_api->set_sections( $sections );
    $settings_api->set_fields( $fields );

    //initialize them
    $settings_api->admin_init();

    //
    // Initialize our settings for specific content types
    //
    $content_types = array(
      'key' => array(
        array(
          'name'    => 'name',
          'label'   => __( 'Label', 'bc' ),
          'desc'    => __( '', 'bc' ),
          'type'    => 'textarea',
        ),
      ),
    );

    foreach ($content_types as $type => $fields){
      $conf = WeDevs_Settings_API::getInstance($type);
      $id   = $type . '_settings';

      $conf->set_sections( array(array('id' => $id, 'title' => __( 'Settings', 'bc' ))) );

      $conf->set_fields( array( $id => $fields) );

      //initialize them
      $conf->admin_init();
    }
}

add_action( 'admin_init', 'bc_admin_init' );

function cat_options($tax_name){
  $cats = get_categories(array('taxonomy' => $tax_name));
  $ret  = array('' => '');
  foreach ($cats as $cat) {
    $ret[$cat->term_id] =  $cat->name;
  }
  return $ret;
}

function page_options() {
  $pages = get_pages();
  $ret  = array('' => '');
  foreach ($pages as $page) {
    $ret[$page->ID] =  $page->post_title;
  }
  return $ret;
}

function menu_options($menu_name = 'primary'){
  $ret  = array('' => '');

  if ( ( $locations = get_nav_menu_locations() ) && isset( $locations[ $menu_name ] ) ) {
    $menu = wp_get_nav_menu_object( $locations[ $menu_name ] );
    $menu_items = wp_get_nav_menu_items($menu->term_id);
    foreach ( (array) $menu_items as $key => $menu_item ) {
      if ($menu_item->title != 'Spacer') {
        $ret[$menu_item->url] = $menu_item->title;
      }
    }
  }
  return $ret;
}

function post_options($type = 'post'){
  $args = array('post_type' => $type, 'posts_per_page' => -1);
  $posts = get_posts($args);
  $ret  = array('' => '');
  foreach ($posts as $post) {
    $ret[$post->ID] =  $post->post_title;
  }
  return $ret;
}

/**
 * Display the plugin settings options page
 */
function site_settings_page() {
  $settings_api = WeDevs_Settings_API::getInstance();

  echo '<div class="wrap">';

  settings_errors();

  $settings_api->show_navigation();
  $settings_api->show_forms();

  echo '</div>';
}

/**
 * Display the content type settings options page
 */
function render_content_type_setting_page() {
  $type = isset($_GET['post_type']) ? $_GET['post_type'] : "default";
  $settings_api = WeDevs_Settings_API::getInstance($type);

  echo '<div class="wrap">';

  settings_errors();

  $settings_api->show_navigation();
  $settings_api->show_forms();

  echo '</div>';
}

/**
 * Get the value of a settings field
 *
 * @param string $option settings field name
 * @param string $section the section name this field belongs to
 * @param string $default default text if it's not found
 * @return mixed
 */
function bc_get_option( $section, $option, $default = '' ) {

    $options = get_option( $section );

    if ( isset( $options[$option] ) ) {
        return $options[$option];
    }

    return $default;
}

/**
 * Register the plugin page
 * http://codex.wordpress.org/Function_Reference/add_options_page
 */
add_action( 'admin_menu', 'bc_admin_menu' );

function bc_admin_menu() {
  add_options_page( 'CHANGEME', 'CHANGEME', 'delete_posts', 'site_settings', 'render_content_type_setting_page' );

  $content_types = array(
    // Add Content Types from Above Here
  );

  foreach ($content_types as $type){
    add_submenu_page('edit.php?post_type=' . $type, 'Custom Post Type Admin', 'Settings', 'edit_posts', basename(__FILE__), 'render_content_type_setting_page');
  }
}
