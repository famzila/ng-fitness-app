import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UIService } from 'src/app/shared/ui.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  isLoading: boolean= false;
  loginForm = new FormGroup({
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    password: new FormControl<string>('', [Validators.required, Validators.minLength(6)])
  });
  private loadingSub!: Subscription;

  constructor(private authService: AuthService, private uiService: UIService) { }
  
  ngOnDestroy(): void {
    this.loadingSub?.unsubscribe();
  }

  ngOnInit(): void {
    this.loadingSub = this.uiService.loadingStateSubject$.subscribe(loading => {
      this.isLoading = loading;
    })
  }

  onSubmit(){

    console.warn(this.loginForm.value);
    this.authService.login({
      email: this.loginForm.get('email')?.value,
      password: this.loginForm.get('password')?.value
    });
  }
}
