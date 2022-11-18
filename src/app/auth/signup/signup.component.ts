import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UIService } from 'src/app/shared/ui.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, OnDestroy {

  signupForm = new FormGroup({
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    password: new FormControl<string>('', [Validators.required, Validators.minLength(6)]),
    birthdate: new FormControl<Date|undefined>(undefined, Validators.required),
    terms: new FormControl<boolean>(false, [Validators.requiredTrue]),
  });
  isLoading: boolean = false;
  private loadingSub!: Subscription;

  constructor(private authService: AuthService, private uiService: UIService) {
  }

  ngOnDestroy(): void {
    this.loadingSub?.unsubscribe();
  }

  ngOnInit(): void {
    this.loadingSub = this.uiService.loadingStateSubject$.subscribe(loading => {
      this.isLoading = loading;
    })
  }

  onSubmit(){
    console.warn(this.signupForm.value);
    this.authService.registerUser({
      email: this.signupForm.get('email')?.value,
      password: this.signupForm.get('password')?.value,
    })
  }
}
