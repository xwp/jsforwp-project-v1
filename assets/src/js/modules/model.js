/* global data */
/**
 * Model file for working with data
 */

'use strict';
( function() {

	/**
	 * This file contains methods having to do with
	 * getting and setting of data.  Leverages local
	 * store.
	 *
	 * @exports model
	 *
	 */

	var model = {};

	model.init = function() {

		if ( false === model.checkLocalStore() ) {

			model.updateLocalStore( data );

		}

	};

	/* @TODO: Refactor getPages and getPosts into getContent( 'type' ); */

	/**
	 * Gets posts from local store
	 *
	 * @return {Object[]} pages Array of post objects
	 */
	model.getPosts = function() {

		var posts = model.getLocalStore().posts;

		return posts;

	};

	/**
	 * Gets pages from local store
	 *
	 * @return {Object[]} pages Array of page objects
	 */
	model.getPages = function() {

		var pages = model.getLocalStore().pages;

		return pages;

	};

	/* @TODO: Refactor getPage and getPost into getSingleContent( 'slug', 'type' ); */

	/**
	 * Gets a single post based on url slug
	 *
	 * @param {String} slug The slug of the page
	 * @return {Object} page Single post object
	 */
	model.getPost = function( slug ) {

		var index,
			max,
			posts = model.getLocalStore().posts;

		for ( index = 0, max = posts.length; index < max; index++ ) {

			if ( slug === posts[index].slug ) {

				return posts[index];

			}

		}

		return null;

	};

	/**
	 * Gets a single page based on url slug
	 *
	 * @param {String} slug The slug of the page
	 * @return {Object} page Single page object
	 */
	model.getPage = function( slug ) {

		var index,
			max,
			pages = model.getLocalStore().pages;

		for ( index = 0, max = pages.length; index < max; index++ ) {

			if ( slug === pages[index].slug ) {

				return pages[index];

			}

		}

		return null;

	};

	/**
	 * Gets a single page or post based on url slug
	 *
	 * @param {String} slug The slug of the page or post
	 * @return {Object} single Single page or post object
	 */
	model.getContent = function( slug ) {

		var single;

		if ( null === slug ) {

			single = model.getPage( 'home' );

		} else if ( 'blog' === slug.substring( 0, 4 ) ) {

			single = model.getPost( slug.substring( 5 ) );

		}	else {

			single = model.getPage( slug );

		}

		if ( null === single ) {

			single = {
				title: '404 Error',
				content: 'Content not found'
			};

		}

		return single;

	};

	model.getLocalStore = function() {

		return JSON.parse( localStorage.getItem( 'vanillaPress' ) );

	};

	/**
	 * Checks if local store already exists
	 * @returns {boolean} Returns true if local storage is present,
	 * or false otherwise.
	 */
	model.checkLocalStore = function() {

		return null !== model.getLocalStore();

	};

	model.updateLocalStore = function( store ) {

		localStorage.setItem( 'vanillaPress', JSON.stringify( store ) );

	};

	/**
	 * Updates post or page in local store
	 *
	 * @param {object} contentObj The page or post to update
	 */
	model.updateContent = function( contentObj ) {

		var date = new Date(),
			store = model.getLocalStore();

		if ( 'post' === contentObj.type ) {

			store.posts.forEach( function( post ) {

				if ( post.id === contentObj.id ) {

					post.title = contentObj.title;
					post.content = contentObj.content;
					post.modified = date.toISOString();

				}

			} );

		}

		if ( 'page' === contentObj.type ) {

			store.pages.forEach( function( page ) {

				if ( page.id === contentObj.id ) {

					page.title = contentObj.title;
					page.content = contentObj.content;
					page.modified = date.toISOString();

				}

			} );

		}

		model.updateLocalStore( store );

	};

	model.deleteLocalStore = function( ) {

		localStorage.removeItem( 'vanillaPress' );

	};

	module.exports = model;

}() );
