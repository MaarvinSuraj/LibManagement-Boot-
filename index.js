class Book {
  constructor(name, author, type) {
    this.name = name;
    this.author = author;
    this.type = type;
  }
}

class Display {
  add(book) {
    console.log("Adding to UI");
    let tableBody = document.getElementById('tableBody');
    let uiString = `<tr>
                        <td>${book.name}</td>
                        <td>${book.author}</td>
                        <td>${book.type}</td>
                        <td>
                            <button class="btn btn-primary btn-sm edit">Edit</button>
                            <button class="btn btn-danger btn-sm delete">Remove</button>
                        </td>
                    </tr>`;
    tableBody.innerHTML += uiString;
  }

  clear() {
    let libraryForm = document.getElementById('libraryForm');
    libraryForm.reset();
  }

  validate(book) {
    if (book.name.length < 2 || book.author.length < 2) {
      return false
    } else {
      return true;
    }
  }

  show(type, displayMessage) {
    let message = document.getElementById('message');
    let boldText;
    if (type === 'success') {
      boldText = 'Success';
    } else {
      boldText = 'Error!';
    }
    message.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
                                <strong>${boldText}:</strong> ${displayMessage}
                                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">×</span>
                                </button>
                            </div>`;
    setTimeout(function () {
      message.innerHTML = '';
    }, 5000);
  }

  deleteBook(target) {
    if (target.classList.contains('delete')) {
      target.parentElement.parentElement.remove();
      this.show('success', 'Book removed successfully');
    }
  }

  editBook(target) {
    if (target.classList.contains('edit')) {
      let tableRow = target.parentElement.parentElement;
      let nameElement = tableRow.getElementsByTagName('td')[0];
      let authorElement = tableRow.getElementsByTagName('td')[1];
      let typeElement = tableRow.getElementsByTagName('td')[2];

      let newName = prompt('Enter new name', nameElement.innerText);
      let newAuthor = prompt('Enter new author', authorElement.innerText);
      let newType = prompt('Enter new type', typeElement.innerText);

      nameElement.innerText = newName;
      authorElement.innerText = newAuthor;
      typeElement.innerText = newType;

      this.show('success', 'Book details updated successfully');
    }
  }
}

// Add submit event listener to libraryForm
let libraryForm = document.getElementById('libraryForm');
libraryForm.addEventListener('submit', libraryFormSubmit);

// Add click event listener to tableBody for delete and edit functionality
let tableBody = document.getElementById('tableBody');
tableBody.addEventListener('click', manageBook);

function libraryFormSubmit(e) {
    console.log('You have submitted the library form');
    let name = document.getElementById('bookName').value;
    let author = document.getElementById('author').value;
    let type;
    let fiction = document.getElementById('fiction');
    let programming = document.getElementById('programming');
    let cooking = document.getElementById('cooking');
    let novel = document.getElementById('novel');
    let poetry = document.getElementById('poetry');
    let history = document.getElementById('history');
  
    if (fiction.checked) {
      type = fiction.value;
    } else if (programming.checked) {
      type = programming.value;
    } else if (cooking.checked) {
      type = cooking.value;
    } else if (novel.checked) {
      type = novel.value;
    } else if (poetry.checked) {
      type = poetry.value;
    } else if (history.checked) {
      type = history.value;
    }
  
    let book = new Book(name, author, type);
    console.log(book);
  
    let display = new Display();
  
    if (display.validate(book)) {
      display.add(book);
      display.clear();
      display.show('success', 'Your book has been successfully added');
    } else {
      // Show error to the user
      display.show('danger', 'Sorry, you cannot add this book');
    }
  
    e.preventDefault();
  }



function manageBook(e) {
  let display = new Display();
  let target = e.target;

  display.deleteBook(target);
  display.editBook(target);
}

// Add submit event listener to search form
let searchForm = document.getElementById('searchForm');
searchForm.addEventListener('submit', searchBooks);

function searchBooks(e) {
  e.preventDefault();
  
  let searchText = document.getElementById('searchTxt').value.toLowerCase();
  let tableBody = document.getElementById('tableBody');
  let books = tableBody.getElementsByTagName('tr');

  for (let book of books) {
    let name = book.getElementsByTagName('td')[0].innerText.toLowerCase();

    if (name.includes(searchText)) {
      book.style.display = '';
    } else {
      book.style.display = 'none';
    }
  }

  
}


