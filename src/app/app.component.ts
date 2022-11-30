import { Component } from '@angular/core';
import { BooksService } from './services/books.service';
import { Library } from './models/library';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'roney_library';

  book = {} as Library;
  books!: Library[];

  constructor(private bookService: BooksService) {}
  
  ngOnInit() {
    this.getBooks();
  }

  saveBooks(form: NgForm) {
    if (this.book.id !== undefined) {
      this.bookService.updateBooks(this.book).subscribe(() => {
        this.cleanForm(form);
      });
    } else {
      this.bookService.saveBooks(this.book).subscribe(() => {
        this.cleanForm(form);
      });
    }
  }

  getBooks() {
    this.bookService.getBooks().subscribe((books: Library[]) => {
      this.books = books;
    });
  }

  deleteBooks(books: Library) {
    this.bookService.deleteBooks(books).subscribe(() => {
      this.getBooks();
    });
  }

  editBooks(books: Library) {
    this.book = { ...books };
  }

  cleanForm(form: NgForm) {
    this.getBooks();
    form.resetForm();
    this.book = {} as Library;
  }
}
