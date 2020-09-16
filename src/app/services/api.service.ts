import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';
import {catchError, debounce, debounceTime, delay, map, pluck, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getItems(): Observable<Array<any>> {
    return this.http.get<Array<any>>('assets/data/data.json');
      // .pipe(delay(5000));
  }

  getCars(): Observable<Array<any>> {
    return this.http.get<Array<any>>('assets/data/cars.json');
      // .pipe(delay(5000));
  }

  getUser(): Observable<any> {
    return this.http.get<any>('http://localhost:5000/user');
    // return this.http.get<Array<any>>('https://swapi.dev/api/films').pipe(pluck('results'));
  }

  getPeople(): Observable<Array<any>> {
    // return of([]).pipe(
    //   map(i => {
    //       throw new Error('error');
    //       return i;
    //   }),
    //   catchError(err => of([{
    //     id: 0,
    //     first_name: 'bla'
    //   }])
    // ));
    return this.http.get<Array<any>>('http://localhost:5000/items')
      // .pipe(
      //     catchError(err => of([{
      //       id: 0,
      //       first_name: 'bla'
      //     }]))
      // );
    // return this.http.get<Array<any>>('https://swapi.dev/api/films').pipe(pluck('results'));
  }

  savePeople(): Observable<any> {
    return this.http.post<Observable<any>>('http://localhost:5000/items', null);
  }

  getShips(): Observable<Array<any>> {
    return this.http.get<Array<any>>('http://localhost:5000/cars');
    // return this.http.get<Array<any>>('https://swapi.dev/api/starships').pipe(pluck('results'));
  }
}
