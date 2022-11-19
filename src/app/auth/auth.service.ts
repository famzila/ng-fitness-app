import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Store } from '@ngrx/store';

import { AuthData } from './auth-data.model';
import { TrainingService } from '../training/training.service';
import { UIService } from '../shared/ui.service';
import * as fromRoot from '../app.reducer';
import * as UI from '../shared/ui.actions';
import * as Auth from '../auth/auth.actions';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private router: Router,
    private authFire: AngularFireAuth,
    private trainingService: TrainingService,
    private uiService: UIService,
    private store: Store<{ui: fromRoot.State}>) {

  }

  initAuthListener() {
    this.authFire.authState.subscribe(user => {
      if (user) {
        this.store.dispatch(new Auth.SetAuthenticated());
        this.router.navigate(['/training']);
      } else {
        this.trainingService.cancelSubscriptions();
        this.store.dispatch(new Auth.SetUnauthenticated());
        this.router.navigate(['/login']);
      }
    })
  }

  registerUser(authData: AuthData) {
    this.store.dispatch(new UI.StartLoading());
    this.authFire.createUserWithEmailAndPassword(authData?.email as string, authData?.password as string)
      .then(() => {
        this.store.dispatch(new UI.StopLoading());
      }).catch(error => {
        this.uiService.showSnackbar(error?.message, '', 3000);
        this.store.dispatch(new UI.StopLoading());
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

}