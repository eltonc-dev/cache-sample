import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {SimpleCacheInterceptor} from './simple-cache.interceptor';
import {FakeCacheInterceptor} from './fake-cache.interceptor';
import {RefreshService} from '../refresh.service';
import {RefreshInterceptor} from './refresh.interceptor';
import {ErrorInterceptor} from './error.interceptor';
import {CountRequestsInterceptor} from './count-requests.interceptor';

export const useSimpleCache = {
  provide: HTTP_INTERCEPTORS,
  useClass: SimpleCacheInterceptor,
  multi: true
};

export const useFakeCache = {
  provide: HTTP_INTERCEPTORS,
  useClass: FakeCacheInterceptor,
  multi: true
};

export const useRefresh = {
  provide: HTTP_INTERCEPTORS,
  useClass: RefreshInterceptor,
  multi: true
};

export const useError = {
  provide: HTTP_INTERCEPTORS,
  useClass: ErrorInterceptor,
  multi: true
};

export const useCounter = {
  provide: HTTP_INTERCEPTORS,
  useClass: CountRequestsInterceptor,
  multi: true
};
