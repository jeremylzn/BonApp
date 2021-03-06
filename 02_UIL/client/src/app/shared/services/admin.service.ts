import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../models/login-response-data.model';
import { tap } from 'rxjs/operators';
import { Order } from '../models/order.model';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  readonly rootUrl = 'http://localhost:3000/';

  public allUsers: User[];
  public allOrdersNotCompleted: Order[];
  public allOrdersCompleted: Order[];
  public currentOrder: Order = {
    _id: '',
    orderID: null,
    completed: null,
    customerID: '',
    date: '',
    customerDetails: null,
    items: null,
    time: '',
    totalPrice: null,
  };
  public currentUser: any = {
    'name': '',
    'phone': '',
    'address': ''
  };

  constructor(private http: HttpClient) {}

  getAllOrders() {
    return this.http.get(this.rootUrl + 'admin/orders').pipe(
      tap((res) => {
        this.allOrdersNotCompleted = [];
        this.allOrdersCompleted = [];

        for (var order in res)
          if (!res[order].completed)
            this.allOrdersNotCompleted.push(res[order]);
          else this.allOrdersCompleted.push(res[order]);
      })
    );
  }

  getAllUsers() {
    return this.http.get(this.rootUrl + 'admin/users').pipe(
      tap((res) => {
        this.allUsers = [];
        for (var user in res) this.allUsers.push(res[user]);
      })
    );
  }

  UpdateOrder(itemToUpdate) {
    return this.http.put(
      this.rootUrl + `admin/order/update/${this.currentOrder._id}`,
      itemToUpdate
    );
  }

  updateUser(itemToUpdate, userId) {
    return this.http.put(
      this.rootUrl + `admin/user/update/${userId}`,
      itemToUpdate
    );
  }

  deleteUser(userId) {
    return this.http.delete(this.rootUrl + `admin/users/${userId}`);
  }
}
