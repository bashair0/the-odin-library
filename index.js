const closeIcon = document.querySelector('.close-icon')
const addButton = document.querySelector('[data-add-btn]')
const formSection = document.querySelector('.form-section')
const form = document.querySelector('.add-form')

function displayForm () {
  formSection.classList.remove('hidden')
}

function hideForm () {
  formSection.classList.add('hidden')
}

addButton.addEventListener('click', displayForm)

closeIcon.addEventListener('click', hideForm)

const myLibrary = []
const finished = []

const submitButton = document.querySelector('[data-submit]')
submitButton.addEventListener('click', e => {
  e.preventDefault()
  addBookToLibrary()

  form.reset()
  hideForm()

  updateLibrary()
})

class Book {
  constructor (title, author, pagesNum, isRead) {
    this.title = title
    this.author = author
    this.pagesNum = pagesNum
    this.isRead = isRead
  }
}

function addBookToLibrary () {
  const isFinished = document.querySelector('[data-finished]')
  const titleValue = document.querySelector('[data-title]').value
  const authorValue = document.querySelector('[data-author]').value
  const pagesNumValue = document.querySelector('[data-pages-num]').value
  const newBook = new Book(
    titleValue,
    authorValue,
    pagesNumValue,
    isFinished.checked
  )

  if (isFinished.checked) {
    finished.push(newBook)
  } else {
    myLibrary.push(newBook)
  }
}

function removeBook (library, index) {
  if (library === 'myLib') {
    myLibrary.splice(index, 1)
  } else {
    finished.splice(index, 1)
  }
  updateLibrary()
}

function moveToFinished (index) {
  let finishedBook = myLibrary.splice(index, 1)
  let newFinishedBook = new Book(
    finishedBook[0].title,
    finishedBook[0].author,
    finishedBook[0].pagesNum
  )
  finished.push(newFinishedBook)
  updateLibrary()
}

function updateLibrary () {
  const bookList = document.querySelector('[data-book-list]')
  bookList.innerHTML = ''
  const finishedList = document.querySelector('[data-finished-list]')
  finishedList.innerHTML = ''
  for (let i = 0; i < myLibrary.length; i++) {
    const cover = document.createElement('div')
    cover.classList.add('cover')
    cover.innerHTML = `
    <li class="book-cover">
                  <span class="book-author">${myLibrary[i].author}</span>
                  <span class="book-title">${myLibrary[i].title}</span>
                  <span class="book-pages">${myLibrary[i].pagesNum}</span>
                </li>
                <div class="cover-buttons">
                  <button type="button" class="btn cover-btn" onclick="moveToFinished(${i})">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      height="20px">
                      <path
                        d="M9,20.42L2.79,14.21L5.62,11.38L9,14.77L18.88,4.88L21.71,7.71L9,20.42Z" />
                    </svg>
                    Finished
                  </button>
                  <button type="button" class="btn cover-btn" onclick="removeBook('myLib', ${i})">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      height="20px"
                      fill="#d5304b">
                      <path
                        d="M19,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3M19,19H5V5H19V19M17,8.4L13.4,12L17,15.6L15.6,17L12,13.4L8.4,17L7,15.6L10.6,12L7,8.4L8.4,7L12,10.6L15.6,7L17,8.4Z" />
                    </svg>
                    Remove
                  </button>
                </div>`

    bookList.appendChild(cover)
  }

  for (let i = 0; i < finished.length; i++) {
    const cover = document.createElement('div')
    cover.classList.add('cover')
    cover.innerHTML = `
    <li class="book-cover">
                  <span class="book-author">${finished[i].author}</span>
                  <span class="book-title">${finished[i].title}</span>
                  <span class="book-pages">${finished[i].pagesNum}</span>
                </li>
                <div class="cover-buttons">
                  
                  <button type="button" class="btn cover-btn" onclick="removeBook(finished,${i})">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      height="20px"
                      fill="#d5304b">
                      <path
                        d="M19,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3M19,19H5V5H19V19M17,8.4L13.4,12L17,15.6L15.6,17L12,13.4L8.4,17L7,15.6L10.6,12L7,8.4L8.4,7L12,10.6L15.6,7L17,8.4Z" />
                    </svg>
                    Remove
                  </button>
                </div>`

    finishedList.appendChild(cover)
  }
}
