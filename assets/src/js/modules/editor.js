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
		view = require( './view.js' );

	editor.init = function() {

		editor.listenToggler();
		// If the localStorage has a visible state of true, show it on init.
		editor.checkVisibilityState();

	};

	editor.currentContent = {};
	editor.unSavedContent = false;

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
	 * Check the saved visibility state and display it accordingly
	 */
	editor.checkVisibilityState = function() {

		if ( true === model.getEditorVisibility() ) {

			editor.toggleVisibility();

		}

	};

	/**
	 * Changes the visibility of the editor
	 *
	 * @param {eventObj} event The click event.
	 */
	editor.toggleVisibility = function( event ) {

		var editorEl = helpers.getEditorEl(),
			links = helpers.getLinks(),
			togglerEl = helpers.getEditorToggleEl();

		if ( 'hidden' === editorEl.getAttribute( 'class' ) ) {

			editor.fillEditForm( editor.currentContent );
			editorEl.setAttribute( 'class', '' );
			togglerEl.setAttribute( 'class', '' );
			model.updateEditorVisibility( true );

		} else {

			editorEl.setAttribute( 'class', 'hidden' );
			togglerEl.setAttribute( 'class', 'hidden' );
			model.updateEditorVisibility( false );

			links.forEach( function( link ) {

				link.removeEventListener(
					'click',
					editor.protectUnsavedContent,
					false
				);

			} );

		}

		if ( 'undefined' !== typeof event ) {
			event.preventDefault();
		}

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
			links = helpers.getLinks(),
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
			editor.saveContent,
			false
		);

		links.forEach( function( link ) {

			link.addEventListener(
				'click',
				editor.protectUnsavedContent,
				false
			);

		} );

	};

	editor.updateTitleFromEditor = function() {

		var titleEditorEl = helpers.getTitleEditorEl();

		editor.currentContent.title = titleEditorEl.value;
		view.updateTitleFromEditor( editor.currentContent.title );
		editor.unSavedContent = true;

	};

	editor.updateContentFromEditor = function() {

		var contentEditorEl = helpers.getContentEditorEl();

		editor.currentContent.content = contentEditorEl.value;
		view.updateContentFromEditor( editor.currentContent.content );
		editor.unSavedContent = true;

	};

	/**
	 * Saves the changes to local storage
	 * @param {event} event The click event on the update button.
	 */
	editor.saveContent = function( event ) {

		model.updateContent( editor.currentContent );
		editor.animateSaveBtn();
		editor.unSavedContent = false;

		event.preventDefault();

	};

	/**
	 * Animates the Update button to mimic saving data
	 */
	editor.animateSaveBtn = function() {

		var btn = helpers.getEditorUpdateBtn(),
			saved,
			saving;

		saved = function() {

			setTimeout( function() {

				btn.innerText = 'Update';

			}, 2000 );

		};

		saving = function() {

			setTimeout( function() {

				btn.innerText = 'Saved!';
				saved();

			}, 1000 );

		};

		btn.innerText = 'Saving...';
		saving();

	};

	/**
	 * Adds alert if links are clicked with unsaved content
	 * @param {event} event The click event on the update button.
	 */
	editor.protectUnsavedContent = function( event ) {

		var confirm;

		// when changes happen, warn about losing them
		if ( true === editor.unSavedContent ) {

			confirm = window.confirm( 'You have unsaved content' );

			if ( false === confirm ) {

				event.preventDefault();

			} else {

				editor.unSavedContent = false;

			}

		}

	};

	module.exports = editor;

}() );
