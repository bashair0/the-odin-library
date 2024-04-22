const closeIcon = document.querySelector('.close-icon')
const addButton = document.querySelector('[data-add-btn]')
const formSection = document.querySelector('.form-section')

addButton.addEventListener('click', () => {
  formSection.classList.remove('hidden')
})

closeIcon.addEventListener('click', () => {
  formSection.classList.add('hidden')
})

const myLibrary = []
const finished = []

const submitButton = document.querySelector('[data-submit]')
submitButton.addEventListener('click', e => {
  e.preventDefault()

  const isFinished = document.querySelector('[data-finished]')
  const titleValue = document.querySelector('[data-title]').value
  const authorValue = document.querySelector('[data-author]').value
  const pagesNumValue = document.querySelector('[data-pages-num]').value
  const newBook = new Book(titleValue, authorValue, pagesNumValue)

  if (isFinished.checked) {
    finished.push(newBook)
  } else {
    myLibrary.push(newBook)
  }

  console.log(newBook.info())
  const form = document.querySelector('.add-form')
  form.reset()
  formSection.classList.add('hidden')
  addBookToLibrary()
})

function Book (title, author, pagesNum, isRead) {
  ;(this.title = title),
    (this.author = author),
    (this.pagesNum = pagesNum),
    (this.isRead = isRead ? isRead : 'not read yet'),
    (this.info = function () {
      return `${this.title} by ${this.author}, ${this.pagesNum} pages, ${this.isRead}`
    })
}

function addBookToLibrary () {
  const bookList = document.querySelector('[data-book-list]')
  bookList.innerHTML = ''
  const finishedList = document.querySelector('[data-finished-list]')
  finishedList.innerHTML = ''
  for (let book in myLibrary) {
    const bookCover = document.createElement('li')
    bookCover.classList.add('book-cover')

    const bookCoverAuthor = document.createElement('span')
    bookCoverAuthor.classList.add('book-author')
    bookCoverAuthor.textContent = myLibrary[book].author
    bookCover.appendChild(bookCoverAuthor)

    const bookCoverTitle = document.createElement('span')
    bookCoverTitle.classList.add('book-title')
    bookCoverTitle.textContent = myLibrary[book].title
    bookCover.appendChild(bookCoverTitle)

    const BookPages = document.createElement('span')
    BookPages.classList.add('book-pages')
    BookPages.textContent = myLibrary[book].pagesNum
    bookCover.appendChild(BookPages)
    bookList.appendChild(bookCover)
  }

  for (shu in finished) {
    const bookCover = document.createElement('li')
    bookCover.classList.add('book-cover')

    const bookCoverAuthor = document.createElement('span')
    bookCoverAuthor.classList.add('book-author')
    bookCoverAuthor.textContent = finished[shu].author
    bookCover.appendChild(bookCoverAuthor)

    const bookCoverTitle = document.createElement('span')
    bookCoverTitle.classList.add('book-title')
    bookCoverTitle.textContent = finished[shu].title
    bookCover.appendChild(bookCoverTitle)

    const BookPages = document.createElement('span')
    BookPages.classList.add('book-pages')
    BookPages.textContent = finished[shu].pagesNum
    bookCover.appendChild(BookPages)
    finishedList.appendChild(bookCover)
  }
}
