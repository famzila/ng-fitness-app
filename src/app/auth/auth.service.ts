import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthData } from './auth-data.model';
import { User } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authChange = new Subject<boolean>();
  private user: User | undefined = undefined;

  constructor(private router: Router) { 

  }

  registerUser(authData: AuthData){
    this.user = {
        email: authData?.email,
        userId: Math.round(Math.random() * 10000).toString()
    }
    this.authChange.next(true);
    this.router.navigate(['/trainging']);
  }

  login(user: AuthData){
    this.user = {
        email: user?.email,
        userId: Math.round(Math.random() * 10000).toString()
    }
    this.authChange.next(true);
    this.router.navigate(['/training']);
  }

  logout(){
    this.user = undefined;
    this.authChange.next(false);
    this.router.navigate(['/login']);
  }

  getUser(){
    return {...this.user};
  }

  isAuth(){
    return this.user !== undefined ? true : false;
  }
}