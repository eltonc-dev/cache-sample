import {AfterViewInit, Component, OnInit} from '@angular/core';
import {RefreshService} from '../../projects/cache/src/lib/refresh.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'cache-sample';


  constructor() {
  }

}
