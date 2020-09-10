import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {debounce, debounceTime, delay} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getItems(): Observable<Array<any>> {
    return this.http.get<Array<any>>('assets/data/data.json')
      .pipe(delay(5000));
  }

  getCars(): Observable<Array<any>> {
    return this.http.get<Array<any>>('assets/data/cars.json')
      .pipe(delay(5000));
  }
}
