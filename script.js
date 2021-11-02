const addButton = document.querySelector('.add');
const modal = document.querySelector('.modal');
const submit = document.querySelector('.submit');
const bookRepository = document.querySelector('.book-repository');

let myLibrary = [];
for(i = 0; i < localStorage.length; ++i)
{
    myLibrary.push(JSON.parse(localStorage.getItem(i)));
}
addReadToggle(myLibrary);
displayBooks(myLibrary);

const read = document.querySelector('.read')

let inputs = Array.from(document.querySelectorAll('.inputs input'));

addButton.addEventListener('click', () =>  {
    modal.style.display = 'flex';
})

submit.addEventListener('click', (e) => {
    e.preventDefault();

    let newBook = Object.create(Book);
    const read = document.querySelector('.read')

    for(i = 0; i < inputs.length - 1; ++i)
    {
        newBook[inputs[i].name] = inputs[i].value
    }
    newBook.read = read.checked;
    console.log(newBook);
    myLibrary.push(newBook);
    localStorage.clear();

    for(let i = 0; i < myLibrary.length; ++i)
    {
        localStorage.setItem(i, JSON.stringify(myLibrary[i]));
    }
    addReadToggle(myLibrary);
    displayBooks(myLibrary);
    modal.style.display = 'none';
})

function Book(title, author, pages, read)
{
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function() {
        return `${title} by ${author}, ${pages} pages, ${read} read yet.`
    }
}

function addBookToLibrary(book) {
    myLibrary.push(book)
    return myLibrary;
}

function clearLibrary() {
    const clearBooks = Array.from(bookRepository.querySelectorAll('.card'));
    clearBooks.forEach(book => {
    bookRepository.removeChild(book);
})
}

function displayBooks(bookArray) {
        clearLibrary();
        
        let i = 0;

        bookRepository.removeChild(addButton);
        bookArray.forEach(book => {
        let newDiv = document.createElement('div');
        makeNewCard(newDiv);
        addXButton(newDiv);
        for(key in book)
        {
            if(key === 'title')
            {
                makeCardTitle(book, key, newDiv);
            }
            else if(key === 'pages' || key === 'author' || key === 'read')
            {
                makeCardSubField(book, key, newDiv);
            }
        }
        addReadToggleButton(newDiv, i);
        ++i;
    })
    bookRepository.appendChild(addButton);

    let readToggleButtons = Array.from(document.querySelectorAll('.read-button'));

    readToggleButtons.forEach(button => {
        button.addEventListener('click', () => {
            myLibrary[button.classList[0]].readToggle();
        })
    })
}

function makeNewCard(div) {
    div.classList.add('card');
    bookRepository.appendChild(div);
}

function addXButton(div) {
    let xButton = document.createElement('button');
    xButton.textContent = 'Delete';
    xButton.classList.add('close');
    div.appendChild(xButton);
}

function makeCardTitle(book, key, div) {
    let bookTitle = document.createElement('h3');
    bookTitle.textContent = book[key];
    div.appendChild(bookTitle)
}

function makeCardSubField(book, key, div) {
    let bookField = document.createElement('p');
    bookField.textContent = `${key}: ${book[key]}`;
    div.appendChild(bookField);
}

function addReadToggleButton(div, i) {
    let read = document.createElement('button');
    read.classList.add(`${i}`)
    read.textContent = 'read?'
    read.classList.add('read-button');

    div.appendChild(read);
}

function addReadToggle(library) {
    for (i = 0; i < library.length; ++i)
    {
        library[i].readToggle = function() {
        if(this.read === true)
        {
            this.read = false;
        }
        else if(this.read === false)
        {
            this.read = true;
        }
        for(let i = 0; i < myLibrary.length; ++i)
        {
            localStorage.setItem(i, JSON.stringify(myLibrary[i]));
        }
        displayBooks(myLibrary);
        }
    }
}