const addButton = document.querySelector('.add');
const modal = document.querySelector('.modal');
const submit = document.querySelector('.submit');
const read = document.querySelector('.read')
const bookRepository = document.querySelector('.book-repository');

let myLibrary = [];

let inputs = Array.from(document.querySelectorAll('.inputs input'));

addButton.addEventListener('click', () =>  {
    modal.style.display = 'flex';
})

submit.addEventListener('click', (e) => {
    e.preventDefault();
    const newBook = Object.create(Book);
    const read = document.querySelector('.read')

    for(i = 0; i < inputs.length - 1; ++i)
    {
        newBook[inputs[i].name] = inputs[i].value
    }
    newBook.read = read.checked;
    console.log(newBook);
    myLibrary.push(newBook);
    displayBooks(myLibrary);
    modal.style.display = 'none';
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

function displayBooks(bookArray) {
        const clearBooks = Array.from(bookRepository.querySelectorAll('.card'));
        const addBtn = document.querySelector('.add')
        clearBooks.forEach(book => {
            bookRepository.removeChild(book);
        })

        bookRepository.removeChild(addBtn);
        
        bookArray.forEach(book => {
        let newDiv = document.createElement('div');
        newDiv.classList.add('card');
        bookRepository.appendChild(newDiv);
    })
    bookRepository.appendChild(addBtn);
}