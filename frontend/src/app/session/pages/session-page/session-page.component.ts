import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-session-page',
  templateUrl: './session-page.component.html',
  styleUrls: ['./session-page.component.scss']
})
export class SessionPageComponent {
  get title(): string {
    return this.titleService.getTitle();
  }
  constructor(private route: ActivatedRoute, private titleService: Title){
  }
  
}
