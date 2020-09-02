//By Default we have 3 books
var books = [
    { "BookID": "1", "Title": "Outlier", "Author": "Malcomm Gladwell" },
    { "BookID": "2", "Title": "Die Kunst ueber Geld nachzudenken", "Author": "Andre Kostolany" },
    { "BookID": "3", "Title": "Cosmos", "Author": "Carl Sagan" }
]

module.exports = {
    books: () => books,
    setBooks: (newBooks) => { books = newBooks },
} ;