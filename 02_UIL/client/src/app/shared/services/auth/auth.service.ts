import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';

import { User } from '../../models/auth/user.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = new Subject<User>();

  readonly rootUrl = 'http://localhost:3000/';

  public token: String;

  constructor(private httpRequest: HttpClient) {}

  public SignUp(userInfos: { name: string; email: string; password: string }) {
    return this.httpRequest.post(this.rootUrl + 'users', userInfos);
  }

  public Login(userCredentials: { email: string; password: string }) {
    return this.httpRequest
      .post(this.rootUrl + 'users/login', userCredentials)
      .pipe(
        tap((res) => {
          this.token = res['token'];
        })
      );
  }

  public GetHome() {
    console.log(this.token);

    const header = {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.token}`),
    };

    return this.httpRequest.get(this.rootUrl + 'users/home/' + header);
  }

}
