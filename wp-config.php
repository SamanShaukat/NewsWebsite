<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the website, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://developer.wordpress.org/advanced-administration/wordpress/wp-config/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'NewsWebsite' );

/** Database username */
define( 'DB_USER', 'root' );

/** Database password */
define( 'DB_PASSWORD', '' );

/** Database hostname */
define( 'DB_HOST', 'localhost' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         'RJg[$sCOhF7cv?y_kXp3.vDfTbr[Hk }RG0pV4b,:2~*E1)zKod7tyCN.:Z3m&vM' );
define( 'SECURE_AUTH_KEY',  'kkrx#||4J!3q6Ti>(ML@xLwI#eJHEujz[M|]86$49:/3;F5elxp+b`-Vy{]~HHAa' );
define( 'LOGGED_IN_KEY',    'F%}M,y5WL;~}zEz[?Z{_1eK_Gi!IUaqEI1LuKVwBT8~N5TLW)}FOzwUl5cU8CWC5' );
define( 'NONCE_KEY',        '>;bVO7xw}yVA;!hS.C>$gAd~Qa$Tp7QmM_<Ghw*~w[eXK@=DSuG1Y6Q)2$+9SR;+' );
define( 'AUTH_SALT',        'ucVf_7*QjiXN-qF@SF2cxWEEE8mB-9gAEikf5Lc^CQ>r(*?mjvyPZ-P~18@&R?]1' );
define( 'SECURE_AUTH_SALT', 'F>;(-vOPXh=b< ]k$@Jih,w-K)E(bQFahi?Jj~($D{gaP+v6V2`!3)CG t7M|(a8' );
define( 'LOGGED_IN_SALT',   'u;_/_h{at};E#aYyXO1Kf$4aM4&PDi%W2@M](yoCJnAvjOD:Rck9xH@iy:H_kIep' );
define( 'NONCE_SALT',       'i@G!ik;9iS0K!:#[ZK{{T4irqRJ<H`kKOm9_{7;NZC5|UM[ Yv8L4oj*PaYJqgr<' );

/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://developer.wordpress.org/advanced-administration/debug/debug-wordpress/
 */
define( 'WP_DEBUG', false );

/* Add any custom values between this line and the "stop editing" line. */



/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
