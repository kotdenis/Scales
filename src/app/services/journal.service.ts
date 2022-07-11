import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JournalDto } from '../models/journal';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { SearchModel } from '../models/searchModel';

@Injectable({
  providedIn: 'root'
})
export class JournalService {

  url = 'https://localhost:7057/api/Journal/'

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    
  };

  constructor(private http: HttpClient) { } 

  getJournal() : Observable<JournalDto[]>{
    return this.http.get<JournalDto[]>(this.url + 'journal')
    .pipe(
      tap(_ => console.log('fetched journal')),
      catchError(this.handleError<JournalDto[]>('getJournal'))
  )}

  searchInJournal(searchModel: SearchModel) : Observable<JournalDto[]>{
    return this.http.post<JournalDto[]>(this.url + 'search', searchModel, this.httpOptions)
    .pipe(
      tap(_ => console.log('fetched journal')),
      catchError(this.handleError<JournalDto[]>('getJournal'))
  )}

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); 
      return of(result as T);
    };
  }
}
