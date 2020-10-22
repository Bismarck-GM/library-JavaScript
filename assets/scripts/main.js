const myLibrary = [];
const Book = (title, author, page, read) => ({
  title,
  author,
  page,
  read,
});

function addBookToLibrary(book) {
  myLibrary.push(book);
}

const bookForm = document.forms['book-form'];
const bookTable = document.querySelector('#book-table');

function addElementsToHtml(createdBook) {
  const tr = document.createElement('tr');
  const td1 = document.createElement('td');
  const td2 = document.createElement('td');
  const td3 = document.createElement('td');
  const td4 = document.createElement('td');
  const deleteButton = document.createElement('td');

  tr.id = 'bookTr';
  td1.textContent = createdBook.title;
  td2.textContent = createdBook.author;
  td3.textContent = createdBook.page;
  if (createdBook.read === true) {
    td4.textContent = 'Read';
    td4.className = 'is-success';
  } else {
    td4.textContent = 'Not read';
    td4.className = 'is-warning';
  }

  deleteButton.textContent = 'Delete';
  deleteButton.className = 'is-danger';
  deleteButton.id = 'delete-btn';
  td4.id = 'read-btn';

  tr.appendChild(td1);
  tr.appendChild(td2);
  tr.appendChild(td3);
  tr.appendChild(td4);
  tr.appendChild(deleteButton);
  bookTable.appendChild(tr);
}

function bookInputsSelector() {
  const formValues = [];
  ['#title', '#author', '#page', '#read'].forEach(val => formValues.push(bookForm.querySelector(val)));
  return formValues;
}

function clearInputs() {
  const [title, author, page, read] = bookInputsSelector();
  title.value = '';
  author.value = '';
  page.value = '';
  read.value = 'true';
}


bookForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const [title, author, page, read] = bookInputsSelector();

  const createdBook = Book(title.value, author.value, +page.value, read.value === 'true');

  addElementsToHtml(createdBook);

  clearInputs();
  addBookToLibrary(createdBook);
});

const toggleD = (e) => {
  if (e.target.id === 'delete-btn') {
    const tr = e.target.parentElement;
    bookTable.removeChild(tr);
  }
};

const toggleR = (e) => {
  if (e.target.id === 'read-btn') {
    const btn = e.target;
    if (btn.textContent === 'Read') {
      btn.textContent = 'Not Read';
      btn.className = 'is-warning';
    } else {
      btn.textContent = 'Read';
      btn.className = 'is-success';
    }
  }
};

bookTable.addEventListener('click', (e) => {
  toggleR(e);
  toggleD(e);
});
