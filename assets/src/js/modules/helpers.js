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

	/**
	 * Returns the main navigation element.
	 *
	 * @returns {Element} The page content element.
	 */
	helpers.getNavEl = function() {

		return document.querySelector( '#mainNav ul' );

	};

	/**
	 * Returns a menu item DOM ob
	 * @param {object} contentObj A single page object.
	 * @returns {object} navItemEl List item DOM object
	 */
	helpers.createMenuItem = function( contentObj ) {

		var navItemEl = document.createElement( 'li' ),
			slug = contentObj.slug;

		navItemEl.appendChild( helpers.createLink( contentObj.title, '#' + slug ) );
		return navItemEl;

	};

	/**
	 * Creates a link
	 * @param {string} title The title of the link
	 * @param {string} url The address of the link
	 * @returns {object} Link DOM object
	 */
	helpers.createLink = function( title, url ) {

		var linkEl = document.createElement( 'a' ),
			linkTitle = document.createTextNode( title );

		// linkEl.setAttribute( 'href', url );
		if ( '#home' === url ) {

			linkEl.href = '#';

		} else {

			linkEl.href = url;

		}

		linkEl.appendChild( linkTitle );

		return linkEl;

	};

	/**
	 * Gets Editor toggle
	 * @return {Object} The toggle element
	 */
	helpers.getEditorToggleEl = function() {

		return document.getElementById( 'editorToggle' );

	};

	/**
	 * Gets the Editor
	 * @return {Object} Editor element
	 */
	helpers.getEditorEl = function() {

		return document.getElementById( 'editor' );

	};

	/**
	 * Gets the title editing Input
	 * @return {Object} Title input element
	 */
	helpers.getTitleEditorEl = function() {

		return document.getElementById( 'editTitle' );

	};

	/**
	 * Gets the content editing Input
	 * @return {Object} Content textarea element
	 */
	helpers.getContentEditorEl = function() {

		return document.getElementById( 'editContent' );

	};

	/**
	 * Gets the update button
	 * @return {Object} Content textarea element
	 */
	helpers.getEditorUpdateBtn = function() {

		return document.getElementById( 'editUpdateBtn' );

	};

	module.exports = helpers;

}() );
