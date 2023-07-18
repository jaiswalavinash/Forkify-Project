import * as model from './model.js'
import 'core-js/stable'
import 'regenerator-runtime/runtime'
import { MODAL_CLOSE_SEC } from './config.js'
import recipeView from './view/recipeView.js'
import searchView from './view/searchView.js'
import resultView from './view/resultView.js'
import bookmarksView from './view/bookmarksView.js'
import paginationView from './view/paginationView.js'
import addRecipeView from './view/addRecipeView.js'

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
if(module.hot){  // this is not real javascript. This is basically coming from module bundler.
  module.hot.accept()
}

const controlRecipes = async function () {
  try {
   const id = window.location.hash.slice(1)
   if(!id) return
    recipeView.renderSpinner()
    // 0) Update results view to mark selected search result.
    
    resultView.update(model.getSearchResultsPage())
    bookmarksView.update(model.state.bookmarks)

    // 1) Loading recipe
   await model.loadRecipe(id)
   
    // 2) recipe render
   recipeView.render(model.state.recipe)
  } catch (err) {
    recipeView.renderError()
  }
}

const controlSearchResult = async function(){
  try {
    resultView.renderSpinner()
    // 1) Get seacrh querry.
    const query = searchView.getQuery()
    if(!query) return;
  // 2) Load search results
    await model.loadSearchResults(query)

    // 3) render results.
    resultView.render(model.getSearchResultsPage());

    // 4) Render initial pagination buttons:
    paginationView.render(model.state.search)
  } catch (error) {
    console.log(error)
  }
}

const controlPagination = function(goToPage){
    // 1) render new results.
  resultView.render(model.getSearchResultsPage(goToPage))
  
  // 2) Render new pagination buttons:
  paginationView.render(model.state.search)
}

const controlServings = function(newServings){
  // update the recipe servings(in state)
    model.updateServings(newServings)

  // update the recipe view
  recipeView.update(model.state.recipe)
}
const controlAddBookmark = function(){
  // 1) Add or remove bookmarks.
if(!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
else if(model.state.recipe.bookmarked)  
  model.deleteBookmark(model.state.recipe.id);

  // 2) Update recipe view
  recipeView.update(model.state.recipe)

  // render bookmarks.
  bookmarksView.render(model.state.bookmarks)
}

const controlBookmarks = function(){
  bookmarksView.render(model.state.bookmarks)
}

const controlAddRecipe = async function (newRecipe) {
  try {
    // show loading spinner;
    addRecipeView.renderSpinner();

    // Upload new Recipe Data
    await model.uploadRecipe(newRecipe)
    // render recipe
    recipeView.render(model.state.recipe)

    // success message
    addRecipeView.renderMessage()

    // Render bookmark view
    bookmarksView.render(model.state.bookmarks)

    // change Id in url
    window.history.pushState(null,'',`#${model.state.recipe.id}`)

    // close form window
    setTimeout(()=>{
      addRecipeView.toggleWindow()
    },MODAL_CLOSE_SEC * 1000)

  } catch (err) {
    console.log(err);
    addRecipeView.renderError(err.message)
  }
}

const init = function(){
  bookmarksView.addHandlerRender(controlBookmarks)
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResult);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe)
}
init()