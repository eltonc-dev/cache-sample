import { Injectable } from '@angular/core';
import {BehaviorSubject, forkJoin, from, Observable} from 'rxjs';
import {distinctUntilChanged, filter, map, reduce} from 'rxjs/operators';

interface PendingRequest {
  get: number;
  post: number;
  put: number;
  delete: number;
  patch: number;
}

@Injectable({
  providedIn: 'root'
})
export class HttpHelperService {

  pendingRequest: PendingRequest = {
    get: 0,
    post: 0,
    put: 0,
    delete: 0,
    patch: 0
  };

  getsToRetry = [];

  private requests: BehaviorSubject<PendingRequest> = new BehaviorSubject(this.pendingRequest);
  private toRequest: BehaviorSubject<any[]> = new BehaviorSubject(this.getsToRetry);

  constructor() { }

  startRequest(method: string): void {
    if (method) {
      this.pendingRequest[method.toLocaleLowerCase()] += 1;
      this.requests.next(this.pendingRequest);
    }
    console.log('L - start', this.pendingRequest);
  }

  stopRequest(method: string): void {
    if (method) {
      this.pendingRequest[method.toLocaleLowerCase()] -= 1;
      this.requests.next(this.pendingRequest);
    }
    console.log('L - stop', this.pendingRequest);
  }

  isRequestPending(method?: string): boolean {
    let isPending = false;
    this.requestPendingChanges(method).subscribe( pending => isPending = pending);
    return isPending;
  }

  requestPendingChanges(method?: string): Observable<boolean> {
    return this.requests.pipe(
      map(i => {
        if (method){
          return i[method.toLocaleLowerCase()] > 0;
        }
        return i.get + i.post + i.put + i.patch + i.delete > 0;
      }),
      distinctUntilChanged()
    );
  }

  addToRetry(key: string, observable): void {
    console.log('<> addToRetry', key);
    this.getsToRetry.push({
      key,
      value: observable
    });
    console.log('<> addToRetry', this.getsToRetry);
    this.toRequest.next([...this.getsToRetry]);
  }

  removeRetry(key: string): void {
    console.log('<> removeRetry', key);
    const item = this.getsToRetry.filter(i => i.key === key);
    this.getsToRetry.splice(this.getsToRetry.indexOf(item), 1);
    this.toRequest.next([...this.getsToRetry]);
  }

  hasSomethingToRetry(): Observable<boolean> {
    return this.toRequest.pipe(
      map(i => i && i.length > 0),
      distinctUntilChanged()
    );
  }

  retry(): Observable<any> {
    return forkJoin(this.getsToRetry.map( i => i.value));
  }

}
