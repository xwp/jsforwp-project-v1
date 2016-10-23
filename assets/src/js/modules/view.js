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

	};

	/**
	 * Adds the mark-up for the posts index
	 */
	view.loadBlogPosts = function() {

		var contentEl = helpers.getPageContentEl(),
			index,
			post,
			posts = model.getPosts(),
			postsMarkup = document.createDocumentFragment(),
			postsWrapper = document.createElement( 'section' );

		for ( index = 0; index < posts.length; index++ ) {

			post = view.createPostMarkup( posts[index] );
			postsMarkup.appendChild( post );

		}

		postsWrapper.setAttribute( 'id', 'blogPosts' );
		postsWrapper.appendChild( postsMarkup );
		postsMarkup.appendChild( postsWrapper );
		contentEl.appendChild( postsMarkup );

	};

	/**
	 * Adds the mark-up for the single post
	 *
	 * @param {string} slug The unique slug identifying a post.
	 */
	view.loadBlogPost = function( slug ) {

		var contentEl = helpers.getPageContentEl(),
			post = model.getPost( slug ),
			titleEl = helpers.getPageTitleEl(),
			titleText;

		if ( post ) {

			view.clearContent();
			titleText = document.createTextNode( post.title );
			titleEl.appendChild( titleText );
			contentEl.innerHTML = post.content;

		}

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
		link.setAttribute( 'href', '#' + post.slug );
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

	module.exports = view;

}() );
