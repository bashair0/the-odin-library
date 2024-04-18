function Book (title, author, pagesNum, isRead) {
  ;(this.title = title),
    (this.author = author),
    (this.pagesNum = pagesNum),
    (this.isRead = isRead),
    (this.info = function () {
      return `${this.title} by ${this.author}, ${this.pagesNum} pages, ${this.isRead}`
    })
}

const book1 = new Book('The Hobbit', 'J.R.R. Tolkien', 295, 'not read yet')
console.log(book1.info())
