import { Component } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  username = 'miladepollo123';
  pictureurl = 'https://picsum.photos/200/300';
}
