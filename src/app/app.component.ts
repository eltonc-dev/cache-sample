import {AfterViewInit, Component, OnInit} from '@angular/core';
import {RefreshService} from '../../projects/cache/src/lib/refresh.service';
import {CacheService} from '../../projects/cache/src/lib/cache.service';
import {ApiService} from './services/api.service';
import {HttpHelperService} from '../../projects/cache/src/lib/http-helper.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'cache-sample';

  isRequestPending$ = this.requestHelper.requestPendingChanges();

  constructor(
    private cache: CacheService,
    private apiService: ApiService,
    private requestHelper: HttpHelperService
  ) {
    this.requestHelper.requestPendingChanges().subscribe( value => {
      console.log('isValue', value, this.requestHelper.pendingRequest);
    });
  }

  addItem(): void {
    this.apiService.savePeople().subscribe();
  }

  reset(): void {
    this.cache.setCacheInvalid('items');
  }

  resetCars(): void {
    this.cache.setCacheInvalid('cars');
  }
}
