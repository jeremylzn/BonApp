import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { User } from '../../models/auth/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public user: User = {
    name: '',
    email: '',
    password: ''
  }
  readonly rootUrl = 'http://localhost:3000/'

  public getToken:String;

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
    console.log(this.getToken);
    var header = {
      headers: new HttpHeaders()
        .set('Authorization',  `Bearer ${this.getToken}`)
    }
    return this.httpRequest.get(this.rootUrl + 'users/home/', header);
  }

}
