'use strict'
var gBooks = [];
var gId = (localStorage.getItem('Id') ? localStorage.getItem('Id') : 100)
console.log(gId);
var KEY_BOOKS = 'books'

function createBooks() {

    var books = loadFromStorage(KEY_BOOKS);
    if (books) return books;


    books = [];
    books.push(createBook('abcd', 29.9))
    books.push(createBook('dcba', 19.9))
    books.push(createBook('adca', 35.5))
    gBooks = books
}

function createBook(book, price) {
    localStorage.setItem('Id', gId)
    return {
        title: book,
        id: gId++,
        price: price,
        rate: 0
    }
}

function deleteBook(bookId) {
    gBooks.splice(bookId, 1);
    renderBooks()
}

function addBook(name, price) {
    gBooks.unshift({
        title: name,
        price: price,
        id: gId++,
        rate: 0
    })
    saveToStorage(KEY_BOOKS, gBooks)
    // gBooks = loadFromStorage('books');

}

function updateBook(bookId, bookPrice) {
    gBooks.forEach(function (book) {
        if (book.id === bookId) {
            book.price = bookPrice
        }
    })
    saveToStorage(KEY_BOOKS, gBooks)
    
}

function openModal(bookId) {
    var modal = $('.modal')
    var book = gBooks.filter(function (book) {
        return bookId === book.id
    })
    var cuurentBook = book[0]
    console.log(cuurentBook);

    var str = `
    <div class = 'detail-book'>
    <div> book name:${cuurentBook.title}</div>
     <div>price: ${cuurentBook.price}$</div>
     <div>rate: ${cuurentBook.rate}</div>
     <button onclick = 'closeModal()'>X</button>
     <button onclick = 'updateRateUp(${bookId})'>ThumbUp</button>
     <button onclick = 'updateRateDown(${bookId})'>ThumbDwon</button>
    `
    modal.show().html(str)

}


function closeModal() {
    $('.modal').hide()
}

function updateRateUp(bookId) {
    var book = gBooks.filter(function (book) {
        return bookId === book.id
    })
    saveToStorage(KEY_BOOKS, gBooks)
    
    var cuurentBook = book[0];

    if (cuurentBook.rate < 10) cuurentBook.rate++
    openModal(bookId)
    // openModal(bookId)
}


function updateRateDown(bookId) {
    var book = gBooks.filter(function (book) {
        return bookId === book.id
    })
    saveToStorage(KEY_BOOKS, gBooks)
    
    var cuurentBook = book[0]

    if (cuurentBook.rate > 0) cuurentBook.rate--
    openModal(bookId)
}


function sortByBookName() {
    gBooks.sort(compreByName)
    renderBooks()
}


function sortByPrice() {
    gBooks.sort(function (a, b) {
        return a.price > b.price
    })
    renderBooks()
}


function compreByName(a, b) {
    if (a.title < b.title) return -1
    else if (a.title > b.title) return 1
    return 0
}