/**
 * Logic related to the page editor
 */

'use strict';

( function() {

	/**
	 * Main Editor Object
	 *
	 * @exports editor
	 *
	 */

	var editor = {},
		helpers = require( './helpers.js' ),
		model = require( './model.js' ),
		router = require( './router.js' ),
		view = require( './view.js' );

	editor.init = function() {

		editor.listenToggler();

	};

	editor.currentContent = {};

	/**
	 * Listen for event to trigger the toggling of the Editor
	 */
	editor.listenToggler = function() {

		var togglerEl = helpers.getEditorToggleEl();

		togglerEl.addEventListener(
			'click',
			editor.toggleVisibility,
			false
		);

	};

	/**
	 * Changes the visibility of the editor
	 *
	 * @param {eventObj} event The click event.
	 */
	editor.toggleVisibility = function( event ) {

		var editorEl = helpers.getEditorEl(),
			togglerEl = helpers.getEditorToggleEl();

		if ( 'hidden' === editorEl.getAttribute( 'class' ) ) {

			editor.currentContent = editor.getCurrentContent();
			editor.fillEditForm( editor.currentContent );
			editorEl.setAttribute( 'class', '' );
			togglerEl.setAttribute( 'class', '' );

		} else {

			editorEl.setAttribute( 'class', 'hidden' );
			togglerEl.setAttribute( 'class', 'hidden' );

		}

		event.preventDefault();

	};

	/**
	 * Loads the content into the form elements
	 * @param {object} singleObj A page or post object.
	 */
	editor.fillEditForm = function( singleObj ) {

		var contentEditorEl = helpers.getContentEditorEl(),
			titleEditorEl = helpers.getTitleEditorEl();

		titleEditorEl.value = singleObj.title;
		contentEditorEl.value = singleObj.content;
		editor.addFormListeners();

	};

	/**
	 * Sets up listeners on input events for the form elements
	 */
	editor.addFormListeners = function() {

		var contentEditorEl = helpers.getContentEditorEl(),
			editBtnEl = helpers.getEditorUpdateBtn(),
			titleEditorEl = helpers.getTitleEditorEl();

		titleEditorEl.addEventListener(
			'input',
			editor.updateTitleFromEditor,
			false
		);

		contentEditorEl.addEventListener(
			'input',
			editor.updateContentFromEditor,
			false
		);

		editBtnEl.addEventListener(
			'click',
			editor.updateContent,
			false
		);

	};

	editor.updateTitleFromEditor = function() {

		var titleEditorEl = helpers.getTitleEditorEl();

		editor.currentContent.title = titleEditorEl.value;
		view.updateTitleFromEditor( editor.currentContent.title );

	};

	editor.updateContentFromEditor = function() {

		var contentEditorEl = helpers.getContentEditorEl();

		editor.currentContent.content = contentEditorEl.value;
		view.updateContentFromEditor( editor.currentContent.content );

	};

	/**
	 * Gets the current page contents
	 *
	 * @return {Object} Single page or post object
	 */
	editor.getCurrentContent = function() {

		var slug = router.getSlug();

		return model.getContent( slug );

	};

	/**
	 * Saves the changes to local storage
	 */
	editor.updateContent = function() {

		model.updateContent( editor.currentContent );

	};

	editor.navigationWarning = function() {

		// when changes happen, warn about losing them

	};

	module.exports = editor;

}() );
