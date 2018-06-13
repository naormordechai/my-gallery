'use strict'

function init() {
    gBooks = createBooks()
    renderBooks()
}

function renderBooks() {
    var strhtml = '';
    gBooks.forEach(function (book, idx) {
        console.log(book);

        strhtml += '<tr>'
        strhtml += `
            <td>${gBooks[idx].id}</td>
            <td>${gBooks[idx].title}</td>
            <td>${gBooks[idx].price}</td>
            <td><button onclick = 'openModal(${book.id})'>Read</button></td>
            <td><button onclick = 'readAndUpdateBook(${book.id})'>Update</button></td>
            <td><button onclick = 'onDeleteBook(${idx})'>Delete</button></td>
            `
        strhtml += '</tr>'

    })
    $('.tbl').html(strhtml)
}

function onDeleteBook(idx) {
    deleteBook(idx)
    saveToStorage(KEY_BOOKS, gBooks);

}

function readAndAddNewBook() {
    // var name = prompt('what is your book do yo want?')
    // var price = prompt('how much does is cost?')
    var name = $('.add-book-name').val()
    var price = $('.add-book-price').val()
    addBook(name, price)
    renderBooks()
    var name = $('.add-book-name').val('')
    var price = $('.add-book-price').val('')
}

function readAndUpdateBook(bookId) {
    var bookPrice = +prompt('what is the price?')
    updateBook(bookId, bookPrice)
    renderBooks()
    saveToStorage(KEY_BOOKS, gBooks)

}