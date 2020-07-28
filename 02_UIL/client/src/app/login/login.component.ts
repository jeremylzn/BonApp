import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/services/user.service';
import { User } from '../shared/models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user:User;
  public login:boolean;
  public checkemail:boolean=true;
  
  constructor(private UserService : UserService) {
    this.user=this.UserService.user
   }

  ngOnInit(): void {
  }

  public checkEmail(email:string) {
    const validEmailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (validEmailRegEx.test(email)) {
        this.checkemail = true;
    }else {
      this.checkemail = null;
    }
}

public onSubmit(user:User){
  this.UserService.Login(user)
  .subscribe(res=>{
    this.login=true;
    this.user.name=res["user"].name;
    this.user.email=res["user"].email;
  }, err=>{this.login=false; console.log(err);})
}

}
