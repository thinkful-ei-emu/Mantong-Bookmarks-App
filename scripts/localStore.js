'use strict';

/* global api */

const localStore = (function() {


  const addNewBookmark = function(bookmark) {
    this.localBookmarks.push(bookmark);
  };

  const deleteBookmark = function(id) {
    this.localBookmarks = this.localBookmarks.filter(each => each.id !== id);
  };

  const updateBookmark = function() {
	
  };

  const searchByRating = function(ratingValue) {
    const ratings = {
      'oneStar': 1,
      'twoStars': 2,
      'threeStars': 3,
      'fourStars': 4,
      'fiveStars': 5
    };

    return this.localBookmarks.filter(each => each.rating >= ratings[ratingValue]);
  };

  const findById = function(id) {
    // console.log(`${id}: id`);
    const find = this.localBookmarks.find(each => {
      // console.log(each.id, id, each.id === id);
      return each.id === id;
    });
    return find;
  };

  const toggleAdding = function() {
    this.adding = !this.adding;
  };

  const toggleShowDetailed = function(id) {
    // console.log(id, this.findById);
    this.findById(id).showDetailed = !this.findById(id).showDetailed;
    //console.log(this.findById(id).showDetailed);
  };

  
  return {
    localBookmarks: [],
    // showRating: false,
    adding: false,

    addNewBookmark,
    deleteBookmark,
    updateBookmark,
    searchByRating,
    findById,
    toggleAdding,
    toggleShowDetailed
    
  };
}());