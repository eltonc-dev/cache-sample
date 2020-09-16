import { Injectable } from '@angular/core';
import {ReplaySubject} from 'rxjs';
import * as moment from 'moment';
import {HttpRequest} from '@angular/common/http';
import {CacheItem} from './models/cache-item';
import {element} from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class CacheService {


  private  DATE_FORMAT = 'x';
  private cacheRepository = {} ;

  constructor() { }





  isCacheValid(req: HttpRequest<any>): boolean {
    const cacheItem = this.get(req);
    const ttl = req.headers.get('x_cache_ttl') || 100000;
    if (cacheItem) {
      return this.isAgeOk(ttl, cacheItem);
    }
    return false;
  }

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

  delete(key: string): void {
    const cachedItem = this.get(key);
    if (cachedItem) {
      // cachedItem.value.unsubscribe();
      delete this.cacheRepository[key];
    }
  }

  setCacheInvalid(key: string): void {
    const keysToInvalid = Object.keys(this.cacheRepository)
      .filter( i => i.indexOf(key) >= 0);
    keysToInvalid.forEach( completeKey => {
      const item = this.cacheRepository[completeKey];
      if (item) {
        item.created = moment(0);
      }
    });
  }

  private isAgeOk(maxAge, cacheItem: CacheItem): boolean {
    return moment(cacheItem.created, this.DATE_FORMAT).add(maxAge, 'ms').isSameOrAfter(moment());
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
