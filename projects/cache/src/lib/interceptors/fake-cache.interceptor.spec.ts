import { TestBed } from '@angular/core/testing';

import { FakeCacheInterceptor } from './fake-cache.interceptor';

describe('FakeCacheInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      FakeCacheInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: FakeCacheInterceptor = TestBed.inject(FakeCacheInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
