import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupForm = new FormGroup({
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    password: new FormControl<string>('', [Validators.required, Validators.minLength(6)]),
    birthdate: new FormControl<Date|undefined>(undefined, Validators.required),
    terms: new FormControl<boolean>(false, [Validators.requiredTrue]),
  });

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
  }


  onSubmit(){
    console.warn(this.signupForm.value);
    this.authService.registerUser({
      email: this.signupForm.get('email')?.value,
      password: this.signupForm.get('password')?.value,
    })
  }
}
