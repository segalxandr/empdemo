import { Component } from '@angular/core';

@Component({
  selector: 'emp-app-root',
  template: `
    <router-outlet></router-outlet>
  `,
  // templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Employees App';
}
