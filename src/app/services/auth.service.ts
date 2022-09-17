import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, takeLast } from 'rxjs';

export enum UserRole {
  Guest = 'GUEST',
  User = 'USER',
  Admin = 'ADMIN',
}

export interface User {
  role: UserRole,
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userSubject$ = new BehaviorSubject<User | undefined>(undefined);
  user$: Observable<User | undefined> = this.userSubject$.asObservable();

  user: User | undefined;

  constructor() { 
    this.user$.subscribe(u => this.user = u);
  }

  setRole(role: UserRole) {
    this.userSubject$.next({ role });
  }

  hasPriority(checkedRole: UserRole, currentRole: UserRole): boolean {
    switch (checkedRole) {
      case UserRole.Guest:
        return true;
      case UserRole.User:
        return currentRole === UserRole.User || currentRole === UserRole.Admin;
      case UserRole.Admin:
        return currentRole === UserRole.Admin;
    }
  }
}
