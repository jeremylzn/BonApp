import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth/auth.service';
import { User } from '../shared/models/auth/user.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user: User;
  public token:String;
  public signupForm: FormGroup;

  constructor(private AuthService: AuthService, private router: Router) {
    this.user = this.AuthService.user;
    this.token=this.AuthService.getToken;
  }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      password: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email])
    });
  }

  public onSubmit() {
    this.AuthService.user = {
      password: this.signupForm.get('password').value,
      email: this.signupForm.get('email').value,
    };
    this.AuthService.Login(this.AuthService.user)
      .subscribe(res => {
        console.log(res);
        this.AuthService.getToken=res["token"];
        this.signupForm.reset();
        this.router.navigateByUrl('/users/home');
      }, err => { console.log(err); })
  }


}
