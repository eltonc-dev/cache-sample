import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {SimpleCacheInterceptor} from './simple-cache.interceptor';

export const useSimpleCache = {
  provide: HTTP_INTERCEPTORS,
  useClass: SimpleCacheInterceptor,
  multi: true
};
