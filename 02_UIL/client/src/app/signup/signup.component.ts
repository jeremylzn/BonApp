import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AuthService } from '../shared/services/auth.service';
import { User } from '../shared/models/user.model';
import { NavbarService } from '../shared/services/navbar.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  public user: User;
  public signupForm: FormGroup;
  public registrationSuccess: boolean;

  constructor(
    private AuthService: AuthService,
    private navbarService: NavbarService
  ) {}

  ngOnInit() {
    this.navbarService.changeHeaderTitle('Sign Up'); // Send the title to NavbarService

    this.signupForm = new FormGroup({
      name: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
    });
  }

  public checkPassword(password: string) {
    return password === this.signupForm.get('password').value ? null : true;
  }

  public onSubmit() {
    const userInfo = {
      name: this.signupForm.get('name').value,
      email: this.signupForm.get('email').value,
      password: this.signupForm.get('password').value,
      phone: this.signupForm.get('phone').value,
      address: this.signupForm.get('address').value,
    };

    this.AuthService.SignUp(userInfo).subscribe(
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
