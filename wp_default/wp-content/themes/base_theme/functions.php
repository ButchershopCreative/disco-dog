<?php
/**
 * lmc functions and definitions
 *
 * @package lmc
 * @since lmc 1.0
 */

  if ( ! function_exists( 'lmc_setup' ) ):
  /**
   * Sets up theme defaults and registers support for various WordPress features.
   *
   * Note that this function is hooked into the after_setup_theme hook, which runs
   * before the init hook. The init hook is too late for some features, such as indicating
   * support post thumbnails.
   *
   * @since lmc 1.0
   */
  function lmc_setup() {

    /**
     * Improved var_dump. Usage krumo($obj);
     */
    require_once( get_template_directory() . '/inc/krumo/class.krumo.php' );

    /**
     * Custom helpers for this theme.
     */
    require_once( get_template_directory() . '/inc/helpers.php' );


    /**
     * Custom models for this theme.
     */
		foreach (glob(get_template_directory() . '/inc/models/*.php') as $filename) {
			require_once($filename);
		}

    /**
     * Custom plugins for this theme.
     */
		foreach (glob(get_template_directory() . '/inc/plugins/*.php') as $filename) {
			require_once($filename);
		}

    /**
     * Custom widget for this theme.
     */
		foreach (glob(get_template_directory() . '/inc/widget/*.php') as $filename) {
			require_once($filename);
		}

    /**
     * Site Customizations
     */
    require_once( get_template_directory() . '/inc/settings.php' );

    /**
     * Add default posts and comments RSS feed links to head
     */
    add_theme_support( 'automatic-feed-links' );

    /**
     * Enable support for Post Thumbnails
     */
    add_theme_support( 'post-thumbnails' );

    /**
     * This theme uses wp_nav_menu() in one location.
     */
    register_nav_menus( array(
      'primary' => __( 'Primary Menu', 'lmc' ),
    ) );

    /**
     * Add support for the Aside Post Formats
     */
    add_theme_support( 'post-formats', array( 'aside', ) );
  }
  endif; // lmc_setup
  add_action( 'after_setup_theme', 'lmc_setup' );

  /**
   * Register widgetized area and update sidebar with default widgets
   *
   * @since lmc 1.0
   */
  function lmc_widgets_init() {
    register_sidebar( array(
      'name'          => __( 'Sidebar', 'lmc' ),
      'id'            => 'sidebar-1',
      'before_widget' => '<aside id="%1$s" class="widget %2$s">',
      'after_widget'  => "</aside>",
      'before_title'  => '<h1 class="widget-title">',
      'after_title'   => '</h1>',
    ) );
  }
  add_action( 'widgets_init', 'lmc_widgets_init' );

  /**
   * Enqueue scripts and styles
   */
  function lmc_scripts() {
    global $post;
    $version = 1;

    if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
      wp_enqueue_script( 'comment-reply' );
    }

    wp_enqueue_style( 'style', get_stylesheet_uri(), array(), $version );

    wp_enqueue_script( 'application', get_template_directory_uri() . '/application.js', array('jquery'), $version, true );
  }

  add_action( 'wp_enqueue_scripts', 'lmc_scripts' );

  /**
   * Add data to Timber's default context
   */
  function add_to_context($data){
    $data['menu'] = new TimberMenu('primary');
    return $data;
  }
  add_filter('timber_context', 'add_to_context');


  /**
   * Add helpers to timber templates
   */
  if (class_exists('Timber')){
    TimberHelper::function_wrapper( 'bc_get_option' );
    TimberHelper::function_wrapper( 'krumo' );
    TimberHelper::function_wrapper( 'social' );
  }
