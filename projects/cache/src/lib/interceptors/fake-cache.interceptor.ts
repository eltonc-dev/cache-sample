import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {CacheService} from '../cache.service';
import {startWith, tap} from 'rxjs/operators';

@Injectable()
export class FakeCacheInterceptor implements HttpInterceptor {

  constructor(private cache: CacheService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    if (!this.cache.isCacheable(request)) { return next.handle(request); }

    return this.sendMultipleRequest(request, next);
  }

  private sendMultipleRequest(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    const cachedResponse = this.cache.get(req);
    if (cachedResponse) {
      // const request = req.clone({
      //   setHeaders: {
      //     x_cache_update_key: 'true',
      //   },
      // });
      console.log('use cache', req.urlWithParams, cachedResponse.result);

      return next.handle(req)
        .pipe(startWith<any>(cachedResponse.result));
    } else {
      console.log('set cache', req.urlWithParams);
      this.cache.set(req);
      return next.handle(req).pipe(
        tap(event => {
          if (event instanceof HttpResponse) {
            const cachedItem = this.cache.get(req);
            if (cachedItem && !cachedItem.value.isStopped) {
              // cachedItem.value.next(event);
              cachedItem.result = event;
              // cachedItem.value.complete();
            }
          }
        })
      );
    }
  }
}
