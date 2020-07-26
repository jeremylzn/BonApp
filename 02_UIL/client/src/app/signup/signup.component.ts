import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/services/user.service';
import { User } from '../shared/models/user.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public user:User;
  public registration:boolean;
  public checkemail:boolean=true;

  constructor(private UserService : UserService) {
    this.user=this.UserService.user
  }

  ngOnInit(): void {
    this.resetForm();
  }

  public resetForm(){
    if(this.user!=null){
      this.user.name='',
      this.user.email='',
      this.user.password=''
    }
  }

  public checkPassword(password:string){
    return password===this.user.password ? null:true;
  }

  public checkEmail(email:string) {
    const validEmailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (validEmailRegEx.test(email)) {
        console.log("true " + email);
        this.checkemail = true;
    }else {
      console.log("false " + email);
      this.checkemail = null;
    }
}

  public onSubmit(user:User){
    this.UserService.SignUp(user)
    .subscribe(res=>{this.registration=true; this.resetForm();}, err=>{this.registration=false; console.log("Failed..");})
  }
}
