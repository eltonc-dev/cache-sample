import { Component, OnInit } from '@angular/core';
import {RefreshService} from '../../../projects/cache/src/lib/refresh.service';

@Component({
  selector: 'app-refresh',
  templateUrl: './refresh.component.html',
  styleUrls: ['./refresh.component.css']
})
export class RefreshComponent implements OnInit {

  constructor(private refreshService: RefreshService) { }

  isUpdating = false;

  ngOnInit(): void {
    this.refreshService.updateChanges().subscribe( isUpdating => this.isUpdating = isUpdating);
  }

}
