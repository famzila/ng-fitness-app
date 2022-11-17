import { NgModule, inject } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterModule, RouterStateSnapshot } from '@angular/router';
import { Routes } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { TrainingComponent } from './training/training.component';
import { AuthService } from './auth/auth.service';

const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'training', component: TrainingComponent, canActivate: [(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
      const router = inject(Router);
      const isLoggedIn = inject(AuthService).isAuth();
      if (!isLoggedIn) {
        router.navigate(['/login']);
        return false;
      }

      return true;
    }]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
