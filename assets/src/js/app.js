/**
 * Main app file.	Initializes app components.
 * Display post titles and content on page from JSON
 * Make post titles link to #slug-name
 * When click on post title: [1] Clear content, [2] Display post content
 * When click on a site title, display all blog posts
 */
/* eslint-disable */
var editor,
	model,
	router,
	vanillaPress = {},
	view;

model = require( './modules/model.js' );
view = require( './modules/view.js' );
router = require( './modules/router.js' );
editor = require( './modules/editor.js' );

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
