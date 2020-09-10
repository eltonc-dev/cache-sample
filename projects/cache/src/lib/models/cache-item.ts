import { ReplaySubject } from 'rxjs';

export interface CacheItem {
  created: string;
  value: ReplaySubject<any>;
  cacheUsage: number;
  args?: any;
  key?: string;
  result?: any;
}
