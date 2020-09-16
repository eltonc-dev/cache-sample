import { Component, OnInit } from '@angular/core';
import {RefreshService} from '../../../projects/cache/src/lib/refresh.service';
import {HttpHelperService} from '../../../projects/cache/src/lib/http-helper.service';

@Component({
  selector: 'app-retry',
  templateUrl: './retry.component.html',
  styleUrls: ['./retry.component.css']
})
export class RetryComponent implements OnInit {

  constructor(private httpHelper: HttpHelperService) { }

  hasSomethingToRetry = false;

  ngOnInit(): void {
    this.httpHelper.hasSomethingToRetry().subscribe(v => {
      this.hasSomethingToRetry = v;
      console.log('<> error', v);
    });
  }

  retry(): void {
    this.httpHelper.retry().subscribe();
  }
}
