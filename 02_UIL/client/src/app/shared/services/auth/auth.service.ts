import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

import { User } from '../../models/auth/user.model';
import { BehaviorSubject } from 'rxjs';
import { AuthResponseData } from '../../models/auth/login-response-data.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = new BehaviorSubject<User>(null);

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
            false,
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
            res.user.isAdmin,
            res.user.name
          );
        })
      );
  }

  public logout() {
    this.user.next(null);
    localStorage.removeItem('userData');
  }

  private handleAuth(
    email: string,
    userID: string,
    token: string,
    isAdmin: boolean,
    name: string
  ) {
    const user = new User(email, userID, token, isAdmin, name);
    this.token = token;

    this.user.next(user);

    // Save logged user info in local storage for auto-login
    localStorage.setItem('userData', JSON.stringify(user));
  }

  autoLogin() {
    const userData: {
      email: string;
      id: string;
      isAdmin: boolean;
      name: string;
      token: string;
    } = JSON.parse(localStorage.getItem('userData'));

    if (!userData) {
      return;
    }

    const loadedUser = new User(
      userData.email,
      userData.id,
      userData.token,
      userData.isAdmin,
      userData.name
    );
    this.token = loadedUser.token;

    this.user.next(loadedUser);
  }
}
