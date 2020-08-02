import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AuthService } from '../shared/services/auth/auth.service';
import { User } from '../shared/models/auth/user.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})

export class SignupComponent implements OnInit {
  public user: User;
  public signupForm: FormGroup;
  public registrationSuccess: boolean;

  constructor(private AuthService: AuthService) {
    this.user = this.AuthService.user;
  }

  ngOnInit() {
    this.signupForm = new FormGroup({
      name: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email])
    });
  }

  public checkPassword(password: string) {
    return password === this.signupForm.get('password').value ? null : true;
  }

  public onSubmit() {
    this.AuthService.user = {
      name: this.signupForm.get('name').value,
      password: this.signupForm.get('password').value,
      email: this.signupForm.get('email').value,
    };

    this.AuthService.SignUp(this.AuthService.user).subscribe(
      (res) => {
        this.registrationSuccess = true;
        this.signupForm.reset();
      },
      (err) => {
        this.registrationSuccess = false;
        console.log('Failed..');
      }
    );
  }
}