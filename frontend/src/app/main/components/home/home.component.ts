import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(private titleService: Title) {
    this.titleService.setTitle('Home');
  }

  get title(): string {
    return this.titleService.getTitle();
  }
}
