/**
 * View file for displaying content
 */

'use strict';
( function() {

	/**
	 * This file contains methods having to do with
	 * getting and setting of data.  Leverages local
	 * store.
	 *
	 * @exports view
	 *
	 */

	var helpers = require( './helpers.js' ),
		model = require( './model.js' ),
		view = {};

	view.init = function() {

		view.createMainMenu();

	};

	/**
	 * Create navigation.
	 */
	view.createMainMenu = function() {

		var index,
			max,
			navEl = helpers.getNavEl(),
			navMarkup = document.createDocumentFragment(),
			pages = model.getPages();

		for ( index = 0, max = pages.length; index < max; index++ ) {

			navMarkup.appendChild( helpers.createMenuItem( pages[index] ) );

		}
		navEl.appendChild( navMarkup );

	};

	/**
	 * Adds the mark-up for the posts index
	 */
	view.loadBlogPosts = function() {

		var contentEl = helpers.getPageContentEl(),
			index,
			page = model.getPage( 'blog' ),
			post,
			posts = model.getPosts(),
			postsMarkup = document.createDocumentFragment(),
			postsWrapper = document.createElement( 'section' ),
			title,
			titleEl = helpers.getPageTitleEl();

		title = document.createTextNode( page.title );
		titleEl.appendChild( title );

		for ( index = 0; index < posts.length; index++ ) {

			post = view.createPostMarkup( posts[index] );
			postsMarkup.appendChild( post );

		}

		postsWrapper.setAttribute( 'id', 'blogPosts' );
		postsWrapper.appendChild( postsMarkup );
		postsMarkup.appendChild( postsWrapper );
		contentEl.appendChild( postsMarkup );

	};

	/* @TODO: Move null check inside the model */
	/**
	 * Adds the mark-up for the single post / page
	 *
	 * @param {object} single An object representing a single post or page.
	 */
	view.renderSingle = function( single ) {

		var contentEl = helpers.getPageContentEl(),
			contentMarkup,
			titleEl = helpers.getPageTitleEl(),
			titleText;

		view.clearContent();

		if ( null === single ) {

			titleText = '404 Error';
			contentMarkup = 'Content not found';

		} else {

			titleText = single.title;
			contentMarkup = single.content;

		}

		titleEl.appendChild( document.createTextNode( titleText ) );
		contentEl.innerHTML = contentMarkup;

	};

	/**
	 * Generates the post mark-up
	 *
	 * @param {object} post The Javascript object parsed from JSON representing
	 * a single post.
	 *
	 * @returns {DocumentFragment} The HTML mark-up needed to render the post
	 * excerpt.
	 */
	view.createPostMarkup = function( post ) {

		var content = document.createElement( 'div' ),
			link = document.createElement( 'a' ),
			postFragment = document.createDocumentFragment(),
			title,
			titleText = document.createTextNode( post.title ),
			wrapper = document.createElement( 'article' );

		title = document.createElement( 'h3' );
		link.setAttribute( 'href', '#blog/' + post.slug );
		link.appendChild( titleText );
		title.appendChild( link );
		title.setAttribute( 'class', 'pageTitle' );

		wrapper.appendChild( title );

		content.setAttribute( 'class', 'pageContent' );
		content.innerHTML = post.content;
		wrapper.appendChild( content );

		postFragment.appendChild( wrapper );

		return postFragment;

	};

	view.clearContent = function() {

		var contentEl = helpers.getPageContentEl(),
			titleEl = helpers.getPageTitleEl();

		// faster than .innerHTML = ''
		while ( contentEl.firstChild ) {

			contentEl.removeChild( contentEl.firstChild );

		}

		while ( titleEl.firstChild ) {

			titleEl.removeChild( titleEl.firstChild );

		}

	};

	/**
	 * Live updates on the title
	 *
	 * @param {string} newTitle New title received from editor
	 */
	view.updateTitleFromEditor = function( newTitle ) {

		var titleEl = helpers.getPageTitleEl();

		while ( titleEl.firstChild ) {

			titleEl.removeChild( titleEl.firstChild );

		}

		titleEl.appendChild( document.createTextNode( newTitle ) );

	};

	/**
	 * Live updates on the content
	 *
	 * @param {string} newContent New content received from editor
	 */
	view.updateContentFromEditor = function( newContent ) {

		var contentEl = helpers.getPageContentEl();

		while ( contentEl.firstChild ) {

			contentEl.removeChild( contentEl.firstChild );

		}

		contentEl.appendChild( document.createTextNode( newContent ) );

	};

	module.exports = view;

}() );
