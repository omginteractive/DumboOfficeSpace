<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the web site, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * Localized language
 * * ABSPATH
 *
 * @link https://wordpress.org/support/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'local' );

/** Database username */
define( 'DB_USER', 'root' );

/** Database password */
define( 'DB_PASSWORD', 'root' );

/** Database hostname */
define( 'DB_HOST', 'localhost' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8' );

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
define( 'AUTH_KEY',          'L%Gl$nkZ Ju~hcIuw8EH =XH=R9fe,X*t61#)Bx[J8HF2OPUxhUf2;o$<b)m)[9#' );
define( 'SECURE_AUTH_KEY',   'Sm6bKB_o~-w=~*&h<:;F(E=D3tSAE4y~`t)4l=msj|a&A.lY,,_p#$%(bX_q}@et' );
define( 'LOGGED_IN_KEY',     'M,}eNH0+v@?^RwtxT85,]J%HXsx}oJTnBpl, T,c)%/0%2j5(MPP7{!|U*t(Vvyw' );
define( 'NONCE_KEY',         '-3{,c)NLn9gsb#?:4O:/{24O1mBHM#SyypG}soEP_uOlVjV03r5%j|Tl+vrtP$5~' );
define( 'AUTH_SALT',         '9)VO!Mx}|w(W8|7`O8lrhuA`Z*0/W!%-]pKDW4.Tou7iy+P!0(W$HH*xkb?HCYIq' );
define( 'SECURE_AUTH_SALT',  'N;U<nYbdjL:6u6|Y9{vHl`ESQ]P4#TXd;&cfY;!*&I22IL^X-nv,oM&EfncP[.Be' );
define( 'LOGGED_IN_SALT',    'p.!Lf6@BlFg(WD@!f0mo=D{6KNyt<x/OnKj?N)6[ZEU|aNJkMrL3|NN9]|V~tdE&' );
define( 'NONCE_SALT',        'kZEjv=ifyMgj5.h8bD,<8t{p]Ba(B8J:2iCc^WA;KqfZ$-y])fqdLZ_0Hex7|#C1' );
define( 'WP_CACHE_KEY_SALT', 'PXCu4Ndv~bbv8$2ll^BmtE)SxC;gs7kM7-,qJa9$UUy,&7$H_H77yBoZ(e7`Z^^8' );


/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';


/* Add any custom values between this line and the "stop editing" line. */



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
 * @link https://wordpress.org/support/article/debugging-in-wordpress/
 */
if ( ! defined( 'WP_DEBUG' ) ) {
	define( 'WP_DEBUG', false );
}

define( 'WP_ENVIRONMENT_TYPE', 'local' );
/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
