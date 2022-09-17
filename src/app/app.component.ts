import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'roles-sample';

  formChanged({ role }: { role: 'guest' | 'user' | 'admin' }) {
    console.log(role);
  }
}
