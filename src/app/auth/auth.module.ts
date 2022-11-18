import { NgModule } from '@angular/core';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';

import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { SharedModule } from '../shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';



@NgModule({
  declarations: [SignupComponent, LoginComponent],
  imports: [SharedModule, AngularFireAuthModule, AuthRoutingModule],
})
export class AuthModule { }
