import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {RefreshService} from '../refresh.service';
import {filter, tap} from 'rxjs/operators';

@Injectable()
export class RefreshInterceptor implements HttpInterceptor {

  constructor(private refresh: RefreshService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const update = request.headers.get('x_cache_update_key');
    if (update) {
      this.refresh.startUpdating();
    }
    return next.handle(request)
      .pipe(
        filter( i => i instanceof HttpResponse),
        tap(() => this.refresh.stopUpdating())
      );
  }
}
