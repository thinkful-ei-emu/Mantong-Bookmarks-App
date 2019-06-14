'use strict';

/* global $ */

const api = (function() {

  const API_URL = 'https://thinkful-list-api.herokuapp.com/mantong'; 
  const endpoint = '/bookmarks';

  const fetchAllBookmarks = function(callback) {
    $.getJSON(`${API_URL}/bookmarks`, callback);
  };

  const createBookmark = function(newBookmarkObj, callback, errorCallback) {
    const newBookmark = JSON.stringify(newBookmarkObj);

    $.ajax({
      url: `${API_URL}${endpoint}`,
      method: 'POST',
      contentType: 'application/json',
      data: newBookmark,
      success: callback,
      error: errorCallback
    });

  };

  const updateBookmark = function(id, updatedInfo, callback) {

    $.ajax({
      url: `${API_URL}${endpoint}/${id}`,
      method: 'PATCH',
      contentType: 'application/json',
      data: JSON.stringify(updatedInfo),
      success: callback
    });
  };

	

  const deleteBookmark = function(id, callback) {

    $.ajax({
      url: `${API_URL}${endpoint}/${id}`,
      method: 'DELETE',
      contentType: 'application/json',
      success: callback
    });
  };




  return {
    fetchAllBookmarks,
    updateBookmark,
    createBookmark,
    deleteBookmark
  };
}());