import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { MenuItem } from '../models/menu-item.model';
import { Order } from '../models/order.model';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  readonly rootUrl = 'http://localhost:3000/';
  cartChanged = new Subject<MenuItem[]>();
  menu: MenuItem[] = [];

  private shoppingCart: MenuItem[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  getMenu() {
    return this.menu;
  }

  getCart() {
    return this.shoppingCart;
  }

  // TODO: add findDuplicateItems to automatically increase quantity of selected item
  addItemToCart(item: MenuItem) {
    this.shoppingCart.push({ ...item, quantity: 1 });
    this.cartChanged.next(this.shoppingCart);
  }

  removeItemFromCart(index: number) {
    this.shoppingCart.splice(index, 1);
    this.cartChanged.next(this.shoppingCart);

    console.log(this.shoppingCart);
  }

  clearShoppingCart() {
    this.shoppingCart = [];
    this.cartChanged.next(this.shoppingCart);
  }

  getOrderHistory() {
    return this.http
      .get<Order[]>(this.rootUrl + 'orders')
      .pipe(map((orders) => orders.filter((order) => order.completed)));
  }

  reOrder(items: MenuItem[]) {
    this.router.navigate(['/order']);

    for (let item of items) {
      this.addItemToCart(item);
    }

    this.cartChanged.next(this.shoppingCart);
  }

  //TODO: add order as guest feature
  submitOrder() {
    return this.http
      .post(this.rootUrl + 'orders', { items: this.shoppingCart })
      .pipe(
        tap((res) => {
          // UX: 500ms delay
          setTimeout(() => this.clearShoppingCart(), 500);
        })
      );
  }
}
