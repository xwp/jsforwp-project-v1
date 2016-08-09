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
		var postElement, headlineElement, contentElement;

		postElement = this.getPostElement();
		headlineElement = this.getHeadlineElement( postData.title );
		contentElement = this.getContentElement( postData.content );

		postElement.appendChild( headlineElement );
		postElement.appendChild( contentElement );
		return postElement;
	},

	getPostElement: function() {
		return document.createElement( 'article' );
	},

	getHeadlineElement: function ( headlineText ) {
		var headlineElement = document.createElement( 'h3' );

		headlineElement.innerText = headlineText;
		return headlineElement;
	},

	getContentElement: function ( rawContent ) {
		var matches, tagName, contentText, contentElement;

		contentElement = document.createElement( 'div' );
		contentElement.innerHTML = rawContent;
		return contentElement;
	}

};

vanillaPress.init();


// Add your custom code starting here:
