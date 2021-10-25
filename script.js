let addButton = document.querySelector('.add');
let modal = document.querySelector('.modal');
let submit = document.querySelector('.submit');
let myLibrary = [];
const newBook = Object.create(Book);

let inputs = Array.from(document.querySelectorAll('.inputs input'));

addButton.addEventListener('click', () =>  {
    modal.style.display = 'flex';
})

submit.addEventListener('click', (e) => {
    e.preventDefault();
})

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