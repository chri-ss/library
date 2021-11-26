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

    static readToggle() {
        if(this.read === true)
            {
                this.read = false;
            }
            else if(this.read === false)
            {
                this.read = true;
            }
            for(let i = 0; i < myLibrary.library.length; ++i)
            {
                localStorage.setItem(i, JSON.stringify(myLibrary[i]));
            }
            Display.displayBooks(myLibrary.library);
    }
}

class Display {

    static displayBooks(bookArray) {
        Library.clearLibrary();
        for(let i = 0; i < bookArray.length; ++i)
        {
            localStorage.setItem(i, JSON.stringify(myLibrary.library[i]));
        }
        
        let i = 0;
        if(bookRepository.contains(addButton))
        {
            bookRepository.removeChild(addButton);
        }
        else
        {
            bookRepository.appendChild(addButton);
        }
        bookArray.forEach(book => {
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
        bookRepository.appendChild(addButton);
        })  
    }

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

        for(let i = 0; i < library.length; ++i)
        {
            Object.setPrototypeOf(library[i], Book)
        }
    }
    
    static deleteBook(library, i) {
        if(library.length > 1)
        {
            myLibrary.library.splice(i, 1);
            localStorage.removeItem(i);
            Display.displayBooks(myLibrary.library);
        }
        else
        {
            myLibrary.library.pop();
            localStorage.clear();
            Display.displayBooks(myLibrary.library);
        }
    }

    static addReadToggleEventListeners() {
        let readToggleButtons = Array.from(document.querySelectorAll('.read-button'));

        readToggleButtons.forEach(button => {
        button.addEventListener('click', () => {
        myLibrary.library[button.classList[0]].readToggle();
        Library.addReadToggleEventListeners();
        Library.addDeleteEventListeners();
        })
    })
    }

    static addDeleteEventListeners() {
        let deleteButtons = Array.from(document.querySelectorAll('.delete'));

        deleteButtons.forEach(button => {
        button.addEventListener('click', () => {
        Library.deleteBook(myLibrary.library, button.classList[0] )
        Display.displayBooks(myLibrary.library);
        Library.addDeleteEventListeners();
        Library.addReadToggleEventListeners();
        })
    })
    }
}

let myLibrary = new Library;

Library.pullBooksFromLocalStorage(myLibrary.library);
Library.addReadToggle(myLibrary.library);
Display.displayBooks(myLibrary.library);

bookRepository.appendChild(addButton);

Library.addReadToggleEventListeners();
Library.addDeleteEventListeners();

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
        localStorage.setItem(i, JSON.stringify(myLibrary.library[i]));
    }
    Library.addReadToggle(myLibrary.library);
    Display.displayBooks(myLibrary.library);
    Library.addReadToggleEventListeners();
    Library.addDeleteEventListeners();
    bookRepository.appendChild(addButton);
    modal.style.display = 'none';
})