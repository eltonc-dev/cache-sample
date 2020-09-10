import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable()
export class CacheRequestInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    return next.handle(req);
      // if (!this.cache.isCacheable(req)) { return next.handle(req); }

    //   const strategy = req.headers.get(CacheKeysEnum.CacheStrategy);
    // if (strategy === CacheStrategyEnum.Soft) {
    //   const cachedResponse = this.cache.get(req);
    //   return cachedResponse ?
    //     cachedResponse.value : this.sendRequest(req, next);
    // }
    //
    //   return this.sendMultipleRequest(req, next);
  }

  // private sendRequest(req: HttpRequest<any>, next: HttpHandler) {
  //   this.cache.set(req);
  //   return next.handle(req).pipe(
  //     tap(result => {
  //       const cachedItem = this.cache.get(req);
  //       if (cachedItem && !cachedItem.value.isStopped) {
  //         cachedItem.value.next(result);
  //       }
  //     })
  //   );
  // }
  //
  // private sendMultipleRequest(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
  //   const cachedResponse = this.cache.get(req);
  //   if (cachedResponse) {
  //     const request = req.clone({
  //       setHeaders: {
  //         'cache_update_key': 'true',
  //       },
  //     });
  //     console.log('use cache', req.urlWithParams, cachedResponse.result);
  //     // return cachedResponse.value.pipe(
  //     //   concatMap(() => next.handle(request))
  //     // );
  //     return next.handle(request)
  //       .pipe(startWith(cachedResponse.result));
  //   } else {
  //     console.log('set cache', req.urlWithParams);
  //     this.cache.set(req);
  //     return next.handle(req).pipe(
  //       tap(result => {
  //         const cachedItem = this.cache.get(req);
  //         if (cachedItem && !cachedItem.value.isStopped) {
  //           console.log('set cache', req.urlWithParams, result);
  //           cachedItem.value.next(result);
  //           cachedItem.result = result;
  //           cachedItem.value.complete();
  //         }
  //       })
  //     );
  //   }
  // }
}
