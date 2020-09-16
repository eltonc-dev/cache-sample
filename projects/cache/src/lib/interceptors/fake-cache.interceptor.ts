import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpResponse
} from '@angular/common/http';
import {MonoTypeOperatorFunction, Observable, of} from 'rxjs';
import {CacheService} from '../cache.service';
import {startWith, tap} from 'rxjs/operators';
import {RefreshService} from '../refresh.service';

@Injectable()
export class FakeCacheInterceptor implements HttpInterceptor {

  constructor(private cache: CacheService, private refreshService: RefreshService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    if (!this.cache.isCacheable(request)) {
      this.cache.setCacheInvalid(request.url);
      return next.handle(request);
    }

    return this.sendMultipleRequest(request, next);
  }

  private sendMultipleRequest(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    const cachedResponse = this.cache.get(req);
    if (cachedResponse) {

      // cache valido retorna o valor cacheado
      if (this.cache.isCacheValid(req)) {
        return of(this.cache.get(req).result);
      }
      // atualiza o cache
      this.cache.set(req);

      // seta header de update
      const request = req.clone({
        setHeaders: {
          x_cache_update_key: 'true',
        },
      });

      // retorna valor cacheado, enquanto busca novas informações
      // atualiza o cache logo no final
      return next.handle(request)
        .pipe(
          startWith<any>(cachedResponse.result),
          this.setCacheValue(req)
        );
    } else {

      this.cache.set(req);
      return next.handle(req).pipe(
        this.setCacheValue(req)
      );
    }
  }

  private setCacheValue(req): MonoTypeOperatorFunction<any> {
    return tap(event => {
      if (event instanceof HttpResponse) {
        const cachedItem = this.cache.get(req);
        if (cachedItem && !cachedItem.value.isStopped) {
          cachedItem.result = event;
        }
      }
    });
  }
}

