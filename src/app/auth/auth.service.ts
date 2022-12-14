import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Subject } from 'rxjs';

import { AuthData } from './auth-data.model';
import { TrainingService } from '../training/training.service';
import { UIService } from '../shared/ui.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authChange$ = new Subject<boolean>();
  isAutheticated: boolean = false;

  constructor(private router: Router,
    private authFire: AngularFireAuth,
    private trainingService: TrainingService,
    private uiService: UIService) {

  }

  initAuthListener() {
    this.authFire.authState.subscribe(user => {
      if (user) {
        this.isAutheticated = true;
        this.authChange$.next(true);
        this.router.navigate(['/training']);
      } else {
        this.trainingService.cancelSubscriptions();
        this.isAutheticated = false;
        this.authChange$.next(false);
        this.router.navigate(['/login']);
      }
    })
  }

  registerUser(authData: AuthData) {
    this.uiService.loadingStateSubject$.next(true);
    this.authFire.createUserWithEmailAndPassword(authData?.email as string, authData?.password as string)
      .then(result => {
        console.log(result);
        this.uiService.loadingStateSubject$.next(false);
      }).catch(error => {
        this.uiService.showSnackbar(error?.message, '', 3000);
        this.uiService.loadingStateSubject$.next(false);
      });
  }

  login(user: AuthData) {
    this.uiService.loadingStateSubject$.next(true);
    this.authFire.signInWithEmailAndPassword(user?.email as string, user?.password as string)
      .then((result) => {
        console.log(result);
        this.uiService.loadingStateSubject$.next(false);
      }).catch(error => {
        this.uiService.showSnackbar(error?.message, '', 3000);
        this.uiService.loadingStateSubject$.next(false);
      });
  }

  logout() {
    this.authFire.signOut();

  }

  isAuth() {
    return this.isAutheticated;
  }
}