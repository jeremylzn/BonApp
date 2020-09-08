import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject, pipe } from 'rxjs';

import { MenuItem } from '../models/menu-item.model';
import { AuthService } from './auth/auth.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class OrderService {

  readonly rootUrl = 'http://localhost:3000/';
  cartChanged = new Subject<MenuItem[]>();
  menu: MenuItem[]=[]

  private shoppingCart: MenuItem[] = [];

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  getMenu() {
    return this.menu;
  }

  getCart() {
    return this.shoppingCart;
  }

  addItemToCart(item: MenuItem) {
    this.shoppingCart.push({ ...item, quantity: 1 });
    this.cartChanged.next(this.shoppingCart);
    // TODO: add findDuplicateItems to automatically increase quantity of selected item

    console.log(this.shoppingCart);
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

  //TODO: add order as guest feature, add auth interceptor to save token as header
  submitOrder() {
    const tokenHeader = {
      headers: new HttpHeaders().set(
        'Authorization',
        `Bearer ${this.authService.token}`
      ),
    };

    return this.http
      .post(this.rootUrl + 'orders', { items: this.shoppingCart }, tokenHeader)
      .pipe(
        tap((res) => {
          console.log(res);

          // UX: 500ms delay -------- keep?
          setTimeout(() => this.clearShoppingCart(), 500);
        })
      );
  }
}
