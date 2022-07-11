import { Injectable } from '@angular/core';
import { TransportDto } from '../models/transport';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { JournalDto } from '../models/journal';

@Injectable({
  providedIn: 'root'
})
export class TransportService {

  url = 'https://localhost:7057/api/Transport/'

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    
  };

  constructor(private http: HttpClient) { } 

  getTransport(): Observable<TransportDto>{
    return this.http.get<TransportDto>(this.url + 'random')
    .pipe(
      tap(_ => console.log('fetched transport')),
      catchError(this.handleError<TransportDto>('getTransport'))
    );
  }

  saveweghing(journalDto: JournalDto): Observable<JournalDto[]>{
    return this.http.post<JournalDto[]>(this.url + 'save', journalDto, this.httpOptions)
    .pipe(
      tap(_ => console.log('fetched transport')),
      catchError(this.handleError<JournalDto[]>('getTransport'))
    );
  }

  createNewTransport(transportDto: TransportDto): Observable<boolean>{
    return this.http.post<boolean>(this.url + 'new-transport', transportDto, this.httpOptions)
    .pipe(
      tap(_ => console.log('fetched transport')),
      catchError(this.handleError<boolean>('getTransport'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); 
      return of(result as T);
    };
  }
}
