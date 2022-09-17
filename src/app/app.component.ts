import { Component } from '@angular/core';
import { AuthService, UserRole } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'roles-sample';

  UserRole = UserRole;

  constructor(
    private auth: AuthService,
  ) {}

  formChanged({ role }: { role: 'guest' | 'user' | 'admin' }) {
    switch (role) {
      case 'guest': 
        this.auth.setRole(UserRole.Guest);
        break;
      case 'user':
        this.auth.setRole(UserRole.User);
        break;
      case 'admin':
        this.auth.setRole(UserRole.Admin);
        break;
    }
  }
}
