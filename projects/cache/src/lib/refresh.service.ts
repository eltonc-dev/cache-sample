import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {distinctUntilChanged} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RefreshService {

  private updating = new BehaviorSubject(false);

  constructor() {
    console.log('>>>');
  }

  startUpdating(): void {
    this.updating.next(true);
  }

  stopUpdating(): void {
    this.updating.next(false);
  }

  updateChanges(): Observable<boolean> {
    return this.updating.pipe(distinctUntilChanged());
  }
}
