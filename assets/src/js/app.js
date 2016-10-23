/**
 * Main app file.	Initializes app components.
 * Display post titles and content on page from JSON
 * Make post titles link to #slug-name
 * When click on post title: [1] Clear content, [2] Display post content
 * When click on a site title, display all blog posts
 */
/* eslint-disable */
var model = require( './modules/model.js' ),
	router = require( './modules/router.js' ),
	vanillaPress = {};

'use strict';

/**
 * The main app object.
 *
 */
vanillaPress = {

	init: function() {

		model.init();
		router.init();

	}
};

vanillaPress.init();
/* eslint-enable */
