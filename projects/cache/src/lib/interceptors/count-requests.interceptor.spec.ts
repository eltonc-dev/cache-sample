import { TestBed } from '@angular/core/testing';

import { CountRequestsInterceptor } from './count-requests.interceptor';

describe('CountRequestsInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      CountRequestsInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: CountRequestsInterceptor = TestBed.inject(CountRequestsInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
