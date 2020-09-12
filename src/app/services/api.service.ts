import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {debounce, debounceTime, delay, pluck} from 'rxjs/operators';

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

  getPeople(): Observable<Array<any>> {
    return this.http.get<Array<any>>('http://localhost:5000/items');
    // return this.http.get<Array<any>>('https://swapi.dev/api/films').pipe(pluck('results'));
  }

  getShips(): Observable<Array<any>> {
    return this.http.get<Array<any>>('http://localhost:5000/cars');
    // return this.http.get<Array<any>>('https://swapi.dev/api/starships').pipe(pluck('results'));
  }
}
