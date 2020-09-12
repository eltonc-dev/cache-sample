import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { ItemsListPageComponent } from './items-list-page/items-list-page.component';
import { CarsListPageComponent } from './cars-list-page/cars-list-page.component';
import {RouterModule} from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {useFakeCache, useRefresh, useSimpleCache} from '../../projects/cache/src/lib/interceptors/interceptors';
import {SimpleCacheInterceptor} from '../../projects/cache/src/lib/interceptors/simple-cache.interceptor';
import {DelayInterceptor} from './services/delay.interceptor';
import { UserComponent } from './user/user.component';
import { RefreshComponent } from './refresh/refresh.component';

@NgModule({
  declarations: [
    AppComponent,
    ItemsListPageComponent,
    CarsListPageComponent,
    UserComponent,
    RefreshComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
      {
        path: '',
        redirectTo: 'items',
        pathMatch: 'full'
      },
      {
        path: 'items',
        component: ItemsListPageComponent
      },
      {
        path: 'cars',
        component: CarsListPageComponent
      }
    ]),
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatButtonModule
  ],
  providers: [
    // useSimpleCache,
    useFakeCache,
    useRefresh
    // { // just to simulate a real connection to backend
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: DelayInterceptor,
    //   multi: true
    // }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
