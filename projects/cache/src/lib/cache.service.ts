import { Injectable } from '@angular/core';
import {ReplaySubject} from 'rxjs';
import * as moment from 'moment';
import {HttpRequest} from '@angular/common/http';
import {CacheItem} from './models/cache-item';

@Injectable({
  providedIn: 'root'
})
export class CacheService {


  private  DATE_FORMAT = 'x';
  private cacheRepository = {} ;

  constructor() { }

  isCacheable(req: HttpRequest<any>): boolean {
    return req && req.method === 'GET';
  }

  get(req: HttpRequest<any> | string): CacheItem {
    let key: string;
    if (req && req instanceof HttpRequest) {
      key = req.urlWithParams;
    } else {
      key = req as string;
    }
    const cachedItem = this.cacheRepository[key];
    return cachedItem || null;
  }

  set(req: HttpRequest<any>): void {
    this.delete(req.urlWithParams);
    this.cacheRepository[req.urlWithParams] = this.createCacheItem(req);
  }

  private delete(key): void {
    const cachedItem = this.get(key);
    if (cachedItem) {
      // cachedItem.value.unsubscribe();
      delete this.cacheRepository[key];
    }
  }


  private createCacheItem = (req: HttpRequest<any>): CacheItem => {
    return req ? {
      created: moment().format(this.DATE_FORMAT),
      cacheUsage: 0,
      value: new ReplaySubject<any>(1),
      key: req.urlWithParams
    } : undefined;
  }
}
