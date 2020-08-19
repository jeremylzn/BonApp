import { Component, OnInit } from '@angular/core';

import { OrderService } from 'src/app/shared/services/order.service';
import { MenuItem } from '../../shared/models/menu-item.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  shoppingCart: MenuItem[] = [];
  totalPrice: number = 0;

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.shoppingCart = this.orderService.getCart();
    this.calculateTotalPrice();

    this.orderService.cartChanged.subscribe((cart) => {
      this.shoppingCart = cart;
      this.calculateTotalPrice();
    });
  }

  private calculateTotalPrice() {
    this.totalPrice = 0;
    this.shoppingCart.forEach((item) => {
      this.totalPrice += item.price;
    });
  }

  onRemoveItem(index: number) {
    this.orderService.removeItemFromCart(index);
  }

  onSubmitOrder() {
    this.orderService.submitOrder();
  }
}
