import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {CacheService} from '../cache.service';
import {tap} from 'rxjs/operators';

@Injectable()
export class SimpleCacheInterceptor implements HttpInterceptor {

  constructor(private cache: CacheService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    if (!this.cache.isCacheable(request)) { return next.handle(request); }

    const cachedResponse = this.cache.get(request);
    return cachedResponse ?
      cachedResponse.value : this.sendRequest(request, next);

    // return next.handle(request);
  }

  protected sendRequest(req: HttpRequest<any>, next: HttpHandler) {
    this.cache.set(req);
    return next.handle(req).pipe(
      tap(result => {
        const cachedItem = this.cache.get(req);
        if (cachedItem && !cachedItem.value.isStopped) {
          cachedItem.value.next(result);
        }
      })
    );
  }
}
