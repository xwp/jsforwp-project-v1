/**
 * Helper file for extra helper functions
 */

'use strict';

( function() {

	/**
	 * Main Helpers Object
	 *
	 * @exports helpers
	 *
	 */

	var helpers = {};

	/**
	 * Returns the main title element.
	 *
	 * @returns {Element} The page title element.
	 */
	helpers.getPageTitleEl = function() {

		return document.getElementById( 'pageTitle' );

	};


	/**
	 * Returns the main content element.
	 *
	 * @returns {Element} The page content element.
	 */
	helpers.getPageContentEl = function() {

		return document.getElementById( 'pageContent' );

	};

	module.exports = helpers;

}() );
