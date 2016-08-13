var getHeadlineAnchor, testHeadlineAnchor;

/*
 * Get an anchor element, based on the slug for a post.
 *
 * Create an anchor node like <a href="/my-post">.
 * The slug above would be 'my-post'.
 * Use a 'document' method to create this, like document.exampleMethod.
 * Return the element you've created.
 * End this function with a 'return' statement, like most of the functions here.
 *
 * @param String $slug URL-friendly title of post, from which to construct href value.
 * @return Object $node Anchor element, with an href value.
 */
getHeadlineAnchor = function( slug ){
	var hrefValue = '/' + slug;

	/*
	 * Implement here.
	 * The hrefValue will be part of the tag that you create, like:
	 * <a href="/my-example-slug">
	 * When finished implementing, copy the entire contents of this function into the function of the same name in app.js.
	 * Including the top line: var hrefValue = '/' + slug;
	 */
};


// Tests, no need to copy these into app.js.
testHeadlineAnchor = function testHeadlineAnchor() {
	var slug, testAnchorElement, expectedElementType, actualElementType, isElementTypeCorrect,
	expectedHrefValue, actualHrefValue, isHrefValueCorrect,
	expectedTagName, actualTagName, isTagNameCorrect;

	slug = 'my-example-slug';
	testAnchorElement = getHeadlineAnchor( slug );
	expectedElementType = 'object';
	actualElementType = typeof testAnchorElement;
	isElementTypeCorrect = ( expectedElementType === actualElementType );

	console.log( 'Testing getHeadlineAnchor function...' );
	console.log( 'The expected type of the return value is ' + expectedElementType + ' and the actual is', actualElementType );
	if ( ! isElementTypeCorrect ) {
		console.log( 'Make sure to use a document method to create this node. Like myNewNode = document.exampleMethod( "exampleArgument" );' );
	}
	if ( testAnchorElement ) {
		expectedHrefValue = '/' + slug;
		actualHrefValue = testAnchorElement.getAttribute( 'href' );
		isHrefValueCorrect = ( expectedHrefValue === actualHrefValue );

		console.log( 'The expected href value is ' + expectedHrefValue + ' and the actual is ', actualHrefValue );
		if ( ! isHrefValueCorrect ) {
			console.log( 'The href value is not set properly. Try using some method of the node you created. Like myNewNode.someExampleMethod( argument, argument );' );
		}
		expectedTagName = 'A';
		actualTagName = testAnchorElement.tagName;
		isTagNameCorrect = ( expectedTagName === actualTagName );
		console.log( 'The expected tag name is ' + expectedTagName + ' and the actual is ' + actualTagName );
		if ( ! isTagNameCorrect ) {
			console.log( 'To create the proper tag name, use a document method to create the tag, and pass the type of tag as an argument.' );
		}
		if ( isElementTypeCorrect && isHrefValueCorrect && isTagNameCorrect ) {
			console.log( 'Your function works as expected. Please copy its contents into the function of the same name in app.js.' );
		}
	} else {
		console.log( 'The function did not return anything. Try adding a return statement at the bottom, like "return someExampleValue;" ' );
	}
};

testHeadlineAnchor();