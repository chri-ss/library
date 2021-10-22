let addButton = document.querySelector('.add');
let modal = document.querySelector('.modal');

addButton.addEventListener('click', () =>  {
    modal.style.display = 'flex';
})

let myLibrary = [];

function Book(title, author, pages, read)
{
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function() 
    {
        return `${title} by ${author}, ${pages} pages, ${read} read yet.`
    }
}

function addBookToLibrary(book) {
    myLibrary.push(book)
    return myLibrary;
}