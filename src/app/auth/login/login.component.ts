import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../app.reducer';
import { UIService } from 'src/app/shared/ui.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    password: new FormControl<string>('', [Validators.required, Validators.minLength(6)])
  });
  isLoading$!: Observable<boolean>;

  constructor(private authService: AuthService, private uiService: UIService, private store: Store<{ui: fromRoot.State}>) { }

  ngOnInit(): void {
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
  }

  onSubmit(){
    this.authService.login({
      email: this.loginForm.get('email')?.value,
      password: this.loginForm.get('password')?.value
    });
  }
}
