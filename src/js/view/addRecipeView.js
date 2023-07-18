import View from "./view"


class AddRecipeView extends View {
    _parentELement = document.querySelector('.upload');
    _message = 'Recipe was successfully uploaded :)'

    _window = document.querySelector('.add-recipe-window')
    _overlay = document.querySelector('.overlay')
    _btnOpen = document.querySelector('.nav__btn--add-recipe')
    _btnClose = document.querySelector('.btn--close-modal')

    constructor() {
        super();
        this._addHandlerShowWindow();
        this._addHandlerHideWindow()
    }

    _addHandlerShowWindow() {
        this._btnOpen.addEventListener('click', this.toggleWindow.bind(this))
    }
    _addHandlerHideWindow(){
        this._btnClose.addEventListener('click', this.toggleWindow.bind(this))
    }
    addHandlerUpload(handler){
        this._parentELement.addEventListener('submit',function(e){

            // here we are inside handler function so "this" points to this._parentELement
            e.preventDefault();
            const dataArr = [...new FormData(this)]
            const data = Object.fromEntries(dataArr)
            handler(data)
        })
    }

    toggleWindow() {
        this._overlay.classList.toggle('hidden');
        this._window.classList.toggle('hidden');
    }

    _generateMarkup() {}
}


export default new AddRecipeView()