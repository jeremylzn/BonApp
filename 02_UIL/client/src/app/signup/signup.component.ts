import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { UserService } from '../shared/services/user.service';
import { User } from '../shared/models/user.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  public user: User;
  public signupForm: FormGroup;
  public checkEmail: boolean = true;
  public registrationSuccess: boolean;

  constructor(private UserService: UserService) {
    this.user = this.UserService.user;
  }

  ngOnInit() {
    this.signupForm = new FormGroup({
      name: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  public checkPassword(password: string) {
    return password === this.signupForm.get('password').value ? null : true;
  }

  public onSubmit() {
    const user: User = {
      name: this.signupForm.get('name').value,
      password: this.signupForm.get('password').value,
      email: this.signupForm.get('email').value,
    };

    this.UserService.SignUp(user).subscribe(
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
