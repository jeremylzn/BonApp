import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public user:User={
    name:'',
    email:'',
    password:''
  }
  readonly rootUrl = 'http://localhost:3000/'
  
  constructor(private httpRequest: HttpClient) { }

  public SignUp(user: User) {
    
    const userInfos: User = {
      name: user.name,
      email: user.email,
      password: user.password
    }
    return this.httpRequest.post(this.rootUrl + 'users', userInfos);
  }

  public Login(user: User) {
    const userInfos: User = {
      email: user.email,
      password: user.password
    }
    return this.httpRequest.post(this.rootUrl + 'users/login', userInfos);
  }

  public GetHome() {
    return this.httpRequest.get(this.rootUrl + 'users/home');
  }

}
