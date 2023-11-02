import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-canchas-placeholder',
  templateUrl: './canchas-placeholder.component.html',
  styleUrls: ['./canchas-placeholder.component.scss']
})
export class CanchasPlaceholderComponent {
  constructor(private titleService: Title) {
    this.titleService.setTitle('Canchas');
  }

  get title(): string {
    return this.titleService.getTitle();
  }
}
