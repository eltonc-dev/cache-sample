import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule} from '@angular/common/http';
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
import {useCounter, useError, useFakeCache, useRefresh} from '../../projects/cache/src/lib/interceptors/interceptors';
import { UserComponent } from './user/user.component';
import { RefreshComponent } from './refresh/refresh.component';
import { ToastrModule } from 'ngx-toastr';
import {RetryComponent} from './retry/retry.component';

@NgModule({
  declarations: [
    AppComponent,
    ItemsListPageComponent,
    CarsListPageComponent,
    UserComponent,
    RefreshComponent,
    RetryComponent
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
    ToastrModule.forRoot(),
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatButtonModule
  ],
  providers: [
    // useSimpleCache,
    useCounter,
    useFakeCache,
    useRefresh,
    useError
    // { // just to simulate a real connection to backend
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: DelayInterceptor,
    //   multi: true
    // }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
