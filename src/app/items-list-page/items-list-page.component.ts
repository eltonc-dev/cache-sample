import { Component, OnInit } from '@angular/core';
import {ApiService} from '../services/api.service';

@Component({
  selector: 'app-items-list-page',
  templateUrl: './items-list-page.component.html',
  styleUrls: ['./items-list-page.component.css']
})
export class ItemsListPageComponent implements OnInit {

  constructor(private api: ApiService) { }

  loading = true;
  items = null;

  ngOnInit(): void {
    this.api.getItems().subscribe(items => {
      this.loading = false;
      this.items = items;
    });
  }

}
