import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-admin-sidebar-item',
  templateUrl: './admin-sidebar-item.component.html',
  styleUrls: ['./admin-sidebar-item.component.scss']
})
export class AdminSidebarItemComponent {

  @Input()
  public label!: string;

  @Input()
  public url!: string;
}
