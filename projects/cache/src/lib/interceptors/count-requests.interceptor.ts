import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {HttpHelperService} from '../http-helper.service';
import {catchError, finalize} from 'rxjs/operators';

@Injectable()
export class CountRequestsInterceptor implements HttpInterceptor {

  constructor(private httpRequest: HttpHelperService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const updateEnabled = request.headers.get('x_cache_update_key');

    if (!updateEnabled) {
      this.httpRequest.startRequest(request.method);
    }

    return next.handle(request)
      .pipe(
        finalize(() => {
          if (!updateEnabled) {
            console.log('L - finalize', request.urlWithParams);
            this.httpRequest.stopRequest(request.method);
            // return next.handle(request);
          }
        })
      );
  }
}
