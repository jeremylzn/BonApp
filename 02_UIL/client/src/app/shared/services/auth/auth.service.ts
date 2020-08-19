import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';

import { User } from '../../models/auth/user.model';
import { Subject } from 'rxjs';
import { AuthResponseData } from '../../models/auth/login-response-data.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = new Subject<User>();

  readonly rootUrl = 'http://localhost:3000/';

  public token: String;

  constructor(private httpRequest: HttpClient) {}

  public SignUp(userInfos: { name: string; email: string; password: string }) {
    return this.httpRequest
      .post<AuthResponseData>(this.rootUrl + 'users', userInfos)
      .pipe(
        tap((res) => {
          this.handleAuth(
            res.user.email,
            res.user._id,
            res.user.token,
            res.user.name
          );
        })
      );
  }

  public Login(userCredentials: { email: string; password: string }) {
    return this.httpRequest
      .post<AuthResponseData>(this.rootUrl + 'users/login', userCredentials)
      .pipe(
        tap((res) => {
          this.handleAuth(
            res.user.email,
            res.user._id,
            res.token,
            res.user.name
          );
        })
      );
  }

  public logout() {
    this.user.next(null);
  }

  public GetHome() {
    //console.log(this.token);

    const header = {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`),
    };

    return this.httpRequest.get(this.rootUrl + 'users/home/', header);
  }

  private handleAuth(email: string, userID: string, token: string, name) {
    const user = new User(email, userID, token, false, name);
    this.token = token;

    this.user.next(user);
  }
}
