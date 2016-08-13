/* Global document, posts */

/**
 * Main app file.  Initializes app components.
 */


/**
 * The main app object.
 *
 */
var vanillaPress = {

	init: function() {

		// Add any functions here you want
		// to run to start the application
		this.renderPosts();

	},

	renderPosts: function() {
		var blogPostsContainer = this.createAndAppendBlogPostsElement();
		this.addEachPostTo( blogPostsContainer );
	},

	createAndAppendBlogPostsElement: function() {
		var postsContainer, blogPosts;

		postsContainer = document.querySelector( '#pageContent' );
		blogPosts = this.getBlogPostsElement();
		postsContainer.appendChild( blogPosts );
		return blogPosts;
	},

	addEachPostTo: function( element ) {
		posts.forEach( function( post ){
			var renderedPost = vanillaPress.getRenderedPost( post );
			element.appendChild( renderedPost );
		} );
	},

	getBlogPostsElement: function( postData ) {
		var blogPosts = document.createElement( 'div' );
		blogPosts.setAttribute( 'id', 'blogPosts' );
		return blogPosts;
	},

	getRenderedPost: function( postData ) {
		var postElement, headlineElement, contentElement, headlineAnchorElement;

		postElement = this.getPostElement();
		headlineElement = this.getHeadlineElement( postData.title );
		contentElement = this.getContentElement( postData.content );

		// If this.getHeadlineAnchor is implemented, use it.
		// Else, append the plain headline, not wrapped in a link.
		if ( this.getHeadlineAnchor( postData.slug ) ) {
			headlineAnchorElement = this.getHeadlineAnchor( postData.slug );
			headlineAnchorElement.appendChild(headlineElement);
			postElement.appendChild(headlineAnchorElement);
		} else {
			postElement.appendChild( headlineElement );
		}
		postElement.appendChild( contentElement );
		return postElement;
	},

	getPostElement: function() {
		return document.createElement( 'article' );
	},

	/*
	 * Get an anchor element, based on the slug for a post.
	 *
	 * Create an anchor like <a href="/my-post">.
	 * The slug above would be 'my-post'.
	 * Use a 'document' method to create this, like document.exampleMethod.
	 * Return the element you've created.
	 * End this function with a 'return' statement, like most of the functions here.
	 *
     * @param String $slug URL-friendly title of post, from which to construct href value.
     * @return Object $node: Anchor tag, with an href value.
	 */
	getHeadlineAnchor: function( slug ){
		var hrefValue = '#' + slug;
		// Implement here.
		// The hrefValue will be part of the tag that you create, like:
		// <a href="/my-example-slug">

	},

	getHeadlineElement: function ( headlineText ) {
		var headlineElement = document.createElement( 'h3' );

		headlineElement.innerText = headlineText;
		return headlineElement;
	},

	getContentElement: function ( rawContent ) {
		var contentElement;

		contentElement = document.createElement( 'div' );
		contentElement.innerHTML = rawContent;
		return contentElement;
	}

};

vanillaPress.init();


// Add your custom code starting here:
