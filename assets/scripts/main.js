const myLibrary = [];

function Book(title, author, page, readed) {
  if (readed === 'read') {
    readed = true;
  } else {
    readed = false;
  }

  this.title = title;
  this.author = author;
  this.page = page;
  this.readed = readed;
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

const bookForm = document.forms['book-form'];
const bookTable = document.querySelector('#book-table');

function addElementsToHtml(title, author, page, readed) {
  const tr = document.createElement('tr');
  const td1 = document.createElement('td');
  const td2 = document.createElement('td');
  const td3 = document.createElement('td');
  const td4 = document.createElement('button');
  const deleteButton = document.createElement('button');

  td1.textContent = title;
  td2.textContent = author;
  td3.textContent = page;
  td4.textContent = readed;

  deleteButton.textContent = 'Delete';
  deleteButton.className = 'delete';
  td4.id = 'readButton';

  tr.appendChild(td1);
  tr.appendChild(td2);
  tr.appendChild(td3);
  tr.appendChild(td4);
  tr.appendChild(deleteButton);
  bookTable.appendChild(tr);
}

function bookParams() {
  const formValues = [];
  ['#title', '#author', '#page', '#read'].forEach(val => formValues.push(bookForm.querySelector(val)));
  return formValues;
}

function clearInputs() {
  const [title, author, page, readed] = bookParams();
  title.value = '';
  author.value = '';
  page.value = '';
  readed.value = 'read';
}


bookForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const [title, author, page, readed] = bookParams();

  const createdBook = new Book(title.value, author.value, page.value, readed.value);

  addElementsToHtml(title.value, author.value, page.value, readed.value);

  clearInputs();
  addBookToLibrary(createdBook);
});

bookTable.addEventListener('click', (e) => {
  if (e.target.className === 'delete') {
    const tr = e.target.parentElement;
    bookTable.removeChild(tr);
  }
});

bookTable.addEventListener('click', (e) => {
  if (e.target.id === 'readButton') {
    const btn = e.target;
    if (btn.textContent === 'read') {
      btn.textContent = 'already Readed';
    } else {
      btn.textContent = 'read';
    }
  }
});
