
/**
 * Main app file.  Initializes app components.
 */


/**
 * The main app object.
 *
 */
var vanillaPress = {

  posts: {},

  init: function() {

    this.posts = this.getBlogsData();
    this.displayBlogPosts();
    this.setSiteNameClickEvent();
  },

  /**
   * Get blog posts data.
   *
   * @return {array} Blog post data.
   */
  getBlogsData: function() {
    return JSON.parse(jsonData);
  },

  /**
   * Display blog posts.
   *
   * @return {void}
   */
  displayBlogPosts: function() {
    var posts = vanillaPress.posts,
      docfrag = document.createDocumentFragment(),
      pageContent  = document.getElementById('pageContent'),
      blogsListSection = document.createElement('section');

    blogsListSection.setAttribute('id', 'blogLists');
    blogsListSection.setAttribute('class', 'blog-lists');

    for (var i = 0; i < posts.length; i++) {
      var article = vanillaPress.createSinglePostForListing(posts[i]);

      blogsListSection.appendChild(article);
    }

    docfrag.appendChild(blogsListSection);
    pageContent.appendChild(docfrag);
  },

  /**
   * Create single blog post to appear in blog listing.
   *
   * @param  {object} post Blog post.
   *
   * @return {void}
   */
  createSinglePostForListing: function(post) {
    var article = document.createElement('article'),
      blogTitle = document.createElement('h3'),
      blogTitleLink = document.createElement('a'),
      blogContent = document.createElement('div');

    article.setAttribute('id', 'blog' + post.id);
    blogTitleLink.textContent = post.title;
    blogTitleLink.setAttribute('href', '#' + post.slug);
    blogTitleLink.dataset.blogId = post.id;
    blogTitleLink.addEventListener('click', vanillaPress.singlePostLinkClickHandler, false);
    blogTitle.appendChild(blogTitleLink);
    blogContent.innerHTML = post.content;

    article.appendChild(blogTitle);
    article.appendChild(blogContent);

    return article;
  },

  /**
   * Create single post.
   *
   * @param  {array} post Post.
   *
   * @return {void}
   */
  createSinglePost: function(post) {
    var article = document.createElement('article'),
      blogTitle = document.createElement('h2'),
      blogContent = document.createElement('div');

    article.setAttribute('id', 'blog' + post.id);
    blogTitle.innerHTML = post.title;
    blogContent.innerHTML = post.content;

    article.appendChild(blogTitle);
    article.appendChild(blogContent);

    return article;
  },

  /**
   * Set site name click event
   */
  setSiteNameClickEvent: function() {
      var siteNameLink = document.querySelector('#siteName a');
      siteNameLink.addEventListener('click', vanillaPress.siteNameClickHandler, false);
  },

  /**
   * Site name click handler.
   *
   * @param  {object} e Event.
   *
   * @return {void}
   */
  siteNameClickHandler: function(e) {
    // e.preventDefault();

    vanillaPress.emptyPageContent(pageContent);
    vanillaPress.displayBlogPosts();
  },

  /**
   * Single post click handler.
   *
   * @param  {object} e Event/
   *
   * @return {void}
   */
  singlePostLinkClickHandler: function(e) {
    // e.preventDefault();
    var article,
      pageContent  = document.getElementById('pageContent');

    vanillaPress.emptyPageContent(pageContent);
    article = vanillaPress.createSinglePost(vanillaPress.posts[this.dataset.blogId - 1]);
    pageContent.appendChild(article);
  },

  /**
   * Empty page content
   *
   * @return {void}
   */
  emptyPageContent: function() {
    var pageContent = document.getElementById('pageContent'),
      blogLinks = document.querySelectorAll('#blogLists article a');

    blogLinks.forEach(function(e) {
      e.removeEventListener('click', vanillaPress.siteNameClickHandler, false);
    });

    while (pageContent.firstChild) {
      pageContent.removeChild(pageContent.firstChild);
    }
  }
};

vanillaPress.init();
