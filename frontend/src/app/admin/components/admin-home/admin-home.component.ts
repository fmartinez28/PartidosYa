import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss']
})
export class AdminHomeComponent implements OnInit {
   
    constructor(
      private titleService: Title,
    ) { }

    ngOnInit(): void {
      this.titleService.setTitle("Admin Dashboard");
    }

    get title () {
      return this.titleService.getTitle();
    }
}
