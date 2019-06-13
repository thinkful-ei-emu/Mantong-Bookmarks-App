##Requirements as User Stories

1.I can add bookmarks to my bookmark list. Bookmarks contain a title (string), url link (string), description (string), rating (number, 1-5)

2.I can see a list of my bookmarks when I first open the app
.All bookmarks in the list default to a "condensed" view showing only title and rating

3.I can click on a bookmark to display the "detailed" view
.Detailed view additionally contains description and a "Visit Site" link

4.I can remove bookmarks from my bookmark list

5.I receive appropriate server feedback when I cannot add/update a bookmark
.See API validations 

6.I can select from a dropdown a "minimum rating" to filter the list by all bookmarks rated equal or above the chosen selection

7.(Extension) I can edit the rating and description of a bookmark in my list

##Technical Requirements
1.Use fetch for AJAX calls and jQuery for DOM manipulation

2.Use namespacing to adhere to good architecture practices
.Minimal global variables
.Create modules in separate files to organize your code
.Logically group your functions (e.g. API methods, store methods...)

3.Keep your Data out of the DOM
.No direct DOM manipulation in your event handlers!
.Follow the React-ful design pattern - change your state, re-render your component

4.Use semantic HTML

5.Use responsive design
.Visually and functionally solid in viewports for mobile and desktop

6.Follow a11y best practices
.Refer back to the lessons on accessibility, forms