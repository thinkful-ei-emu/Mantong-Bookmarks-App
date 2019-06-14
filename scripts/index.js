'use strict';

/* global $, api, localStore, dom */

/**
 * Code included inside 
 * $( document ).ready() 
 * will only run once the page Document Object Model (DOM) is ready for JavaScript code to execute.
 */

$(document).ready(function() {
  dom.bindEventListeners();

  // On initial load, fetch all bookmarks and render
  api.fetchAllBookmarks(bookmarksResponse => {
    bookmarksResponse.forEach(bookmark => localStore.addNewBookmark(bookmark));
    dom.render();
  });
  
	
  // console.log(localStore.findById('cjhcbl6o5003p0kvuru2td9e7'));
});







