import {Injectable} from '@angular/core';
import {HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {BehaviorSubject, Observable, of, Subject} from 'rxjs';
import {catchError, map, retry, startWith, switchAll, switchMap, take, tap} from 'rxjs/operators';
import {CacheService} from '../cache.service';
import {ToastrService} from 'ngx-toastr';
import {HttpHelperService} from '../http-helper.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private cache: CacheService,
              private toaster: ToastrService,
              private httpHelper: HttpHelperService,
              private http: HttpClient
              ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if ( request.method !== 'GET') {
      return next.handle(request);
    }
    this.httpHelper.removeRetry(request.url);
    return next.handle(request).pipe(
      // retry(3),
      tap( event => {
        console.log('event', event, request.urlWithParams);
        if (event instanceof HttpResponse) {
          console.log('retry', event.status, event.url);
        }
      }),
      // tap(() => {
      //   this.toaster.warning('Só mais um pouquinho' );
      // }),
      catchError((error, nextR) => {
        this.cache.delete(request.urlWithParams);
        if (request.method !== 'GET') {
          this.toaster.error('Ops...deu ruim', 'Erro');
          return of(null);
        } else {
          console.log('<> error', request.urlWithParams);
          const subject = new Subject();
          const waytingObservable = subject.asObservable()
            .pipe(
              tap(i => console.log('result 3', i)),
              map( i => (new HttpResponse({
                body: i
              }))),
              take(2),
            );
          const newRequest = this.http.get(request.urlWithParams)
            .pipe(tap(result => {
              console.log('result', result);
              subject.next(result);
              subject.complete();
            }));
          this.httpHelper.addToRetry(request.url, newRequest);

          // return of(new HttpResponse({
          //   body: []
          // }));
          return waytingObservable;
          // return nextError.pipe(
          //   switchMap(() => waytingObservable)
          // );
        }
      })
    );
  }
}
