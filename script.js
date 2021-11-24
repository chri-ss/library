const addButton = document.querySelector('.add');
const modal = document.querySelector('.modal');
const submit = document.querySelector('.submit');
const bookRepository = document.querySelector('.book-repository')

class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
}

class Display {

    static makeNewCard(div) {
        div.classList.add('card');
        bookRepository.appendChild(div);
    }

    static addDeleteButton(div, i) {
        let deleteButton = document.createElement('button');
        deleteButton.classList.add(`${i}`);
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete');
        div.appendChild(deleteButton);
    }

    static makeCardTitle(book, key, div) {
        let bookTitle = document.createElement('h3');
        bookTitle.textContent = book[key];
        div.appendChild(bookTitle)
    }

    static makeCardSubField(book, key, div) {
        let bookField = document.createElement('p');
        if(key === 'author')
        {
            bookField.textContent = `by ${book[key]}`;
        }
        else if(key === 'pages')
        {
            bookField.textContent = `${book[key]} pages`;
        }
        else if(key === 'read')
        {
            book[key] === true ? bookField.textContent = 'read' : bookField.textContent = 'not yet read';
        }
        div.appendChild(bookField);
    }

    static addReadToggleButton(div, i) {
        let read = document.createElement('button');
        read.classList.add(`${i}`);
        read.textContent = 'read?';
        read.classList.add('read-button');
    
        div.appendChild(read);
    }
}

class Library {
    library = [];

    static pullBooksFromLocalStorage() {
        for(let i = 0; i < localStorage.length; ++i)
        {
            myLibrary.library.push(JSON.parse(localStorage.getItem(i)));
        }
    }

    static displayBooks(bookArray) {
        Library.clearLibrary();
        for(let i = 0; i < myLibrary.library.length; ++i)
        {
            localStorage.setItem(i, JSON.stringify(myLibrary.library[i]));
        }
        
        let i = 0;
    
        bookRepository.removeChild(addButton);
        myLibrary.library.forEach(book => {
        let newDiv = document.createElement('div');
        Display.makeNewCard(newDiv);
        for(let key in book)
        {
            if(key === 'title')
            {
                Display.makeCardTitle(book, key, newDiv);
            }
            else if(key === 'pages' || key === 'author' || key === 'read')
            {
                Display.makeCardSubField(book, key, newDiv);
            }
        }
        Display.addReadToggleButton(newDiv, i);
        Display.addDeleteButton(newDiv, i);
        ++i;
        })  
    }

    static addBookToLibrary(book) {
        myLibrary.push(book)
        return myLibrary;
    }

    static clearLibrary() {
        const clearBooks = Array.from(bookRepository.querySelectorAll('.card'));
        clearBooks.forEach(book => {
        bookRepository.removeChild(book);
        })
    }

    static addReadToggle(library) {
        if(library[0] != null)
        {
            for (let i = 0; i < library.length; ++i)
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
    else
    {
        return 0;
    }
    }
    
    static addDeleteBook(library, i) {
        if(library[0] != null)
        {
            for(let i = 0; i < library.length; ++i)
            {
                library[i].delete = function() {
                    if(library.length != 1)
                    {
                        myLibrary.splice(i, 1);
                        localStorage.removeItem(i);
                        displayBooks(myLibrary);
                        addDeleteBook(myLibrary);
                    }
                    else
                    {
                        myLibrary.pop();
                        localStorage.clear();
                        displayBooks(myLibrary);
                    }
                }
            }
        }
        else
        {
            return 0;
        }
    }
}

let myLibrary = new Library;

Library.pullBooksFromLocalStorage(myLibrary.library);
Library.addReadToggle(myLibrary.library);
Library.addDeleteBook(myLibrary.library);
Library.displayBooks(myLibrary.library);

bookRepository.appendChild(addButton);

let readToggleButtons = Array.from(document.querySelectorAll('.read-button'));

readToggleButtons.forEach(button => {
    button.addEventListener('click', () => {
        myLibrary[button.classList[0]].readToggle();
    })
})

let deleteButtons = Array.from(document.querySelectorAll('.delete'));

deleteButtons.forEach(button => {
    button.addEventListener('click', () => {
        myLibrary[button.classList[0]].delete();
        displayBooks(myLibrary);
    })
})

let inputs = Array.from(document.querySelectorAll('.inputs input'));

addButton.addEventListener('click', () =>  {
    modal.style.display = 'flex';
})

submit.addEventListener('click', (e) => {
    e.preventDefault();

    let newBook = new Book(inputs[0].value, inputs[1].value, inputs[2].value, inputs[3].value)

    for(i = 0; i < inputs.length - 1; ++i)
    {
        inputs[i].value = '';
    }
    const read = document.querySelector('.read')
    newBook.read = read.checked;
    console.log(newBook);
    myLibrary.library.push(newBook);
    localStorage.clear();

    for(let i = 0; i < myLibrary.length; ++i)
    {
        localStorage.setItem(i, JSON.stringify(myLibrary[i]));
    }
    Library.addReadToggle(myLibrary);
    Library.addDeleteBook(myLibrary);
    Library.displayBooks(myLibrary);
    bookRepository.appendChild(addButton);
    modal.style.display = 'none';
})