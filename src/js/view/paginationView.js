import View from "./view"
import icons from 'url:../../img/icons.svg'


class PaginationView extends View{
  _parentELement = document.querySelector('.pagination')

  addHandlerClick(handler){
    this._parentELement.addEventListener('click',function(e){
       const btn = e.target.closest('.btn--inline');
       if(!btn) return
       const goToPage = +btn.dataset.goto;
       handler(goToPage)
    })
  }

  _generateMarkup(){
    const currPage = this._data.page
    const no_of_pages = Math.ceil(this._data.results.length / this._data.resultsPerPage)
    // Page 1 , and there are other pages
    if(currPage === 1 && no_of_pages > 1){  // here "data-goto" is data attribute. 
        return `  
        <button data-goto="${currPage + 1}" class="btn--inline pagination__btn--next">   
            <span>Page ${currPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>
        `
    }

    // last page
    if(currPage === no_of_pages && no_of_pages > 1){
        return `
        <button data-goto="${currPage - 1}" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${currPage - 1}</span>
          </button>
        `
    }
    
    // other page
    if(currPage < no_of_pages){
        return `
        <button data-goto="${currPage - 1}" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${currPage - 1}</span>
          </button>
        <button  data-goto="${currPage + 1}" class="btn--inline pagination__btn--next">
          <span>Page ${currPage + 1}</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </button>
        `
    }
    // page 1 , and there are no other pages.
    return ''
  }
}


export default new PaginationView()