import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire/compat';


import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './auth/auth.module';
import { TrainingModule } from './training/training.module';
import { AuthRoutingModule } from './auth/auth-routing.module';
import { CoreModule } from './core/core.module';
import { MaterialModule } from './shared/material/material.module';
import { StoreModule } from '@ngrx/store';
import { reducers } from './app.reducer';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AppRoutingModule,
    AuthRoutingModule,
    AuthModule,
    TrainingModule,
    CoreModule,
    MaterialModule,
    StoreModule.forRoot(reducers)
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
