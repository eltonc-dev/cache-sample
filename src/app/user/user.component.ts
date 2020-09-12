import { Component, OnInit } from '@angular/core';
import {ApiService} from '../services/api.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  user: any;

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.api.getUser().subscribe( user => this.user = user);
  }

}
