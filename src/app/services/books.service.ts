import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Library } from '../models/library';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  
  url = 'http://localhost:3000/library'; // api rest fake

  constructor(private httpClient: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  getBooks(): Observable<Library[]> {
    return this.httpClient.get<Library[]>(this.url)
      .pipe(
        retry(2),
        catchError(this.handleError))
  }

    getBooksById(id: number): Observable<Library> {
      return this.httpClient.get<Library>(this.url + '/' + id)
        .pipe(
          retry(2),
          catchError(this.handleError)
        )
    }

    saveBooks(book: Library): Observable<Library> {
      return this.httpClient.post<Library>(this.url, JSON.stringify(book), this.httpOptions)
        .pipe(
          retry(2),
          catchError(this.handleError)
        )
    }

    updateBooks(book: Library): Observable<Library> {
      return this.httpClient.put<Library>(this.url + '/' + book.id, JSON.stringify(book), this.httpOptions)
        .pipe(
          retry(1),
          catchError(this.handleError)
        )
    }

    deleteBooks(book: Library) {
      return this.httpClient.delete<Library>(this.url + '/' + book.id, this.httpOptions)
        .pipe(
          retry(1),
          catchError(this.handleError)
        )
    }

      // Manipulação de erros
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  };


}
