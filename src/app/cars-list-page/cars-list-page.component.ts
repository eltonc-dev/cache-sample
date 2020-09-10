import { Component, OnInit } from '@angular/core';
import {ApiService} from '../services/api.service';

@Component({
  selector: 'app-cars-list-page',
  templateUrl: './cars-list-page.component.html',
  styleUrls: ['./cars-list-page.component.css']
})
export class CarsListPageComponent implements OnInit {

  constructor(private api: ApiService) { }

  loading = true;
  items = null;

  ngOnInit(): void {
    this.api.getCars().subscribe(items => {
      this.loading = false;
      this.items = items;
    });
  }

}
