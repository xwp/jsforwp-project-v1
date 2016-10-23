/* global jsonData */
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

		model.updateLocalStore( jsonData );
		model.getPosts();

	};

	model.getPosts = function() {

		var posts = model.getLocalStore();

		return posts;

	};

	model.getPost = function( slug ) {

		var index,
			max,
			posts = model.getLocalStore();

		for ( index = 0, max = posts.length; index < max; index++ ) {

			if ( slug === posts[index].slug ) {

				return posts[index];

			}

		}

		return null;

	};

	model.getLocalStore = function() {

		return JSON.parse( localStorage.getItem( 'vanillaPress' ) );

	};

	model.updateLocalStore = function( store ) {

		localStorage.setItem( 'vanillaPress', store );

	};

	model.deleteLocalStore = function( ) {

		localStorage.removeItem( 'vanillaPress' );

	};

	module.exports = model;

}() );
