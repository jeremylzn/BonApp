import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { MenuItem } from '../models/menu-item.model';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  menu: MenuItem[] = [
    { name: 'Burger', description: 'A Tasty Burger', price: 50 },
    { name: 'Pizza', description: 'Best Pizza In The World!', price: 35 },
    { name: 'Toast', description: 'Great Toast!', price: 35 },
    { name: 'Pasta', description: 'Delicious Pasta!', price: 40 },
    { name: 'Fries', description: 'French fries!', price: 14 },
    { name: 'Coke', description: 'Coca Cola', price: 12 },
  ];

  cartChanged = new Subject<MenuItem[]>();
  private shoppingCart: MenuItem[] = [];

  constructor() {}

  getMenu() {
    return this.menu;
  }

  getCart() {
    return this.shoppingCart;
  }

  addItemToCart(item: MenuItem) {
    console.log(item.name, item.price);

    this.shoppingCart.push(item);
    this.cartChanged.next(this.shoppingCart);
  }
}
