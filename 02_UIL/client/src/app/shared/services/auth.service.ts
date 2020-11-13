import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

import { User } from '../models/user.model';
import { BehaviorSubject } from 'rxjs';
import { AuthResponseData } from '../models/login-response-data.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  readonly rootUrl = 'http://localhost:3000/';
  user = new BehaviorSubject<User>(null);
  loggedIn = false;

  public token: String;

  constructor(private http: HttpClient) {}

  public SignUp(userInfos: { name: string; email: string; password: string }) {
    return this.http
      .post<AuthResponseData>(this.rootUrl + 'users', userInfos)
      .pipe(
        tap((res) => {
          this.handleAuth(
            res.user.email,
            res.user._id,
            res.user.token,
            false,
            res.user.name,
            res.user.phone,
            res.user.address
          );
        })
      );
  }

  public Login(userCredentials: { email: string; password: string }) {
    return this.http
      .post<AuthResponseData>(this.rootUrl + 'users/login', userCredentials)
      .pipe(
        tap((res) => {
          this.handleAuth(
            res.user.email,
            res.user._id,
            res.token,
            res.user.isAdmin,
            res.user.name,
            res.user.phone,
            res.user.address
          );
        })
      );
  }

  public logout() {
    this.http.post(this.rootUrl + 'users/logout', {}).subscribe();

    this.loggedIn = false;
    this.user.next(null);
    localStorage.removeItem('userData');
  }

  private handleAuth(
    email: string,
    userID: string,
    token: string,
    isAdmin: boolean,
    name: string,
    phone: string,
    address: string
  ) {
    const user = new User(email, userID, token, isAdmin, name, phone, address);
    this.token = token;

    this.loggedIn = true;
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
      phone: string;
      address: string;
    } = JSON.parse(localStorage.getItem('userData'));

    if (!userData) {
      return;
    }

    const loadedUser = new User(
      userData.email,
      userData.id,
      userData.token,
      userData.isAdmin,
      userData.name,
      userData.phone,
      userData.address
    );
    this.token = loadedUser.token;

    this.loggedIn = true;
    this.user.next(loadedUser);
  }

  public getUserDetails() {
    const userDetails = {
      name: this.user.value.name,
      phone: this.user.value.phone,
      address: this.user.value.address,
    };

    return userDetails;
  }

  public isLoggedIn(): boolean {
    return this.loggedIn;
  }
}
