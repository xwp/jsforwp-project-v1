/**
 * Router logic according to URL update
 */

'use strict';
( function() {

	/**
	 * Main Router Object
	 *
	 * @exports router
	 *
	 */

	var editor = require( './editor.js' ),
		model = require( './model.js' ),
		router = {},
		view = require( './view.js' );

	router.init = function() {

		router.loadContent();
		router.listenPageChange();

	};

	/**
	 * Listener function for URL changes
	 *
	 */
	router.listenPageChange = function() {

		window.addEventListener( 'hashchange', router.loadContent, false );

	};

	/**
	 * Get the slug from the URL
	 *
	 * @returns {string} Slug for content.
	 */
	router.getSlug = function() {

		var slug = window.location.hash;

		if ( '' !== slug ) {

			return slug.substring( 1 );

		}
		return null;

	};

	/**
	 * Loads content according to the URL change
	 */
	router.loadContent = function() {

		var contentObj,
			slug = router.getSlug();

		view.clearContent();
		contentObj = model.getContent( slug );

		if ( 'blog' === slug ) {

			view.loadBlogPosts();

		} else {

			view.renderSingle( contentObj );

		}

		editor.currentContent = contentObj;

	};

	module.exports = router;

}() );
