import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject, pipe } from 'rxjs';

import { User } from '../models/auth/login-response-data.model';
import { AuthService } from './auth/auth.service';
import { tap } from 'rxjs/operators';
import { Order } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  readonly rootUrl = 'http://localhost:3000/';

  public allUsers:User[];
  public allOrdersNotCompleted: Order[];
  public allOrdersCompleted: Order[];
  public currentOrder:Order={_id: '', completed: null, customerID: '', date:'', items:null, time:'', totalPrice:null}
  public currentUser:User={isAdmin: null, _id: '', name: '', email: ''};



  constructor(private http: HttpClient, private authService: AuthService) { }

  getAllOrders(){
    const tokenHeader = {
      headers: new HttpHeaders().set(
        'Authorization',
        `Bearer ${this.authService.token}`
      ),
    };
    return this.http
      .get(this.rootUrl + 'admin/orders', tokenHeader)
      .pipe(
        tap((res) => {
          this.allOrdersNotCompleted=[]
          this.allOrdersCompleted=[]
          for(var order in res)
            if(!res[order].completed)
              this.allOrdersNotCompleted.push(res[order])
            else
              this.allOrdersCompleted.push(res[order])
        })
      );
  }

  getAllUsers(){
    const tokenHeader = {
      headers: new HttpHeaders().set(
        'Authorization',
        `Bearer ${this.authService.token}`
      ),
    };
    return this.http
      .get(this.rootUrl + 'admin/users', tokenHeader)
      .pipe(
        tap((res) => {
          this.allUsers=[]
          for(var user in res)
            this.allUsers.push(res[user])
        })
      );
  }

  UpdateOrder(itemToUpdate){
    const tokenHeader = {
      headers: new HttpHeaders().set(
        'Authorization',
        `Bearer ${this.authService.token}`
      ),
    };
    return this.http
      .put(this.rootUrl + `admin/order/update/${this.currentOrder._id}`, itemToUpdate, tokenHeader)

  }
}
