import { Component, OnInit } from '@angular/core';
import {ApiService} from '../services/api.service';

@Component({
  selector: 'app-items-list-page',
  templateUrl: './items-list-page.component.html',
  styleUrls: ['./items-list-page.component.css']
})
export class ItemsListPageComponent implements OnInit {

  constructor(private api: ApiService) { }

  items$ = this.api.getItems();

  ngOnInit(): void {
  }

}
