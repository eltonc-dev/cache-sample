import { TestBed } from '@angular/core/testing';

import { SimpleCacheInterceptor } from './simple-cache.interceptor';

describe('SimpleCacheInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      SimpleCacheInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: SimpleCacheInterceptor = TestBed.inject(SimpleCacheInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
