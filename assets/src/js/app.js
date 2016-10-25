/**
 * Main app file.	Initializes app components.
 * Display post titles and content on page from JSON
 * Make post titles link to #slug-name
 * When click on post title: [1] Clear content, [2] Display post content
 * When click on a site title, display all blog posts
 */
/* eslint-disable */
var editor = require( './modules/editor.js' ),
	model = require( './modules/model.js' ),
	router = require( './modules/router.js' ),
	vanillaPress = {},
	view = require( './modules/view.js' );

'use strict';

/**
 * The main app object.
 *
 */
vanillaPress = {

	init: function() {

		model.init();
		view.init();
		router.init();
		editor.init();

	}
};

vanillaPress.init();
/* eslint-enable */
