'use strict';

/* global localStore, $, localStore, api */

const dom = (function() {

  function showAddNewForm() {
    $('.toggleForm').on('click', () => {
      // console.log('i ran');
      localStore.toggleAdding();
      $('.addNew').html(addNewForm);
      hideFormButton();
      render();
    });
  }

  function hideFormButton() {
    localStore.adding ? $('.toggleForm').text('Close') : $('.toggleForm').text('Add');
  }

  function addNewForm() {
    return localStore.adding ? `
    <form>
			<label for="title">Title</label>
			<input type="text" id="title" class="newTitle" placeholder="title"/>
			<label for="url">URL</label>
			<input type="text" id="url" class="newUrl" placeholder="http://"/>
			<label for="description">Description</label>
      <input type="text" id="description" class="newDescription" placeholder="discription"/>
      </form>
      <select class="newRating">       
        <option value="fiveStars">5 Stars</option>       
        <option value="fourStars">4 Stars</option>     
        <option value="threeStars">3 Stars</option>      
        <option value="twoStars">2 Stars</option>
        <option value="oneStar">1 Star</option>    
			</select>
			<input type="submit" value="Submit"/>
		` : '';
  }

  function capturingNewBookmarkInfo() {
    $('.addNew').submit(event => {
      // console.log('.addNew');
      event.preventDefault();
      const title = $(event.currentTarget).find('.newTitle').val();
      const url = $(event.currentTarget).find('.newUrl').val();
      const desc = $(event.currentTarget).find('.newDescription').val();
      const rating = parseInt($(event.currentTarget).find('.newRating').find(':selected').text()[0]);

      const newBookmark = {
        title,
        url,
        desc,
        rating,
        showDetailed: false
      };

      api.createBookmark(newBookmark, bookmark => {
        localStore.addNewBookmark(bookmark);
        localStore.toggleAdding();
        render();
      }, error => {
        $('.addNew').prepend('<p>Title and URL are required! Also, make sure your URL is prefixed by http(s)://</p>');
      });

    });
  }


  function getIdFromElement(article) {
    return ($(article).closest('.article')).attr('articleid');
  }

  function deleteBookmarkFromDom() {
    $('.bookmarkList').on('click', '.deleteArticle', event => {
      const currentElementId = getIdFromElement(event.currentTarget);
			
      api.deleteBookmark(currentElementId, () => {
        localStore.deleteBookmark(currentElementId);
        render();
      });
    });

  }

  function showDescription() {
    $('.bookmarkList').on('click', '.toggleDescription', event => {
      const articleId = getIdFromElement(event.currentTarget);
      localStore.toggleShowDetailed(articleId);
      render();
    });
  }

  function toggleDescriptionHtml(singleBookmarkObj) {
    console.log(singleBookmarkObj);
    return singleBookmarkObj.showDetailed ? `
			<p>${singleBookmarkObj.desc}</p>
			<a href="${singleBookmarkObj.url}"><button class="visit">Visit Site</button></a>
		` : '';
  }

  function filterByRating() {
    $('.filterByRating').on('change', event => {
      const value = $(event.currentTarget).val();
      const filtered = localStore.searchByRating(value);
      render(filtered);
    });
  }

  function getStars(rating) {

    // Round to nearest half
    rating = Math.round(rating * 2) / 2;
    let output = [];
  
    // Append all the filled whole stars
    for (var i = rating; i >= 1; i--)
      output.push('<i class="fa fa-star" aria-hidden="true" style="color: gold;"></i>&nbsp;');
  
    // If there is a half a star, append it
    if (i === .5) output.push('<i class="fa fa-star-half-o" aria-hidden="true" style="color: gold;"></i>&nbsp;');
  
    // Fill the empty stars
    for (let i = (5 - rating); i >= 1; i--)
      output.push('<i class="fa fa-star-o" aria-hidden="true" style="color: gold;"></i>&nbsp;');
  
    return output.join('');
  
  }
  function generateBookmarkHtml(singleBookmarkObj) {
    return `
			<li class="article" articleid="${singleBookmarkObj.id}">
				<h3>${singleBookmarkObj.title}</h3>
				
				${toggleDescriptionHtml(singleBookmarkObj)}
				<button class="toggleDescription">Detail</button>
				<button class="deleteArticle">Delete</button>
        <p class="rating">Rating:${getStars(singleBookmarkObj.rating)} </p>
        
		</li>
		`;
  }

  function generateAllBookmarksHtml(articles) {
    return articles.map(each => generateBookmarkHtml(each)).join('');
  }


  function render(articles = localStore.localBookmarks) {
    $('.bookmarkList').html(generateAllBookmarksHtml(articles));
  }

  const bindEventListeners = function() {
    showAddNewForm();
    capturingNewBookmarkInfo();
    deleteBookmarkFromDom();
    showDescription();
    filterByRating();
    getStars();
  };

  return {
    render,
    bindEventListeners
  };

}());


