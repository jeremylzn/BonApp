import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2/dist/sweetalert2.js';

import { AuthService } from 'src/app/shared/services/auth.service';
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
  hasNote:boolean = false;
  orderCompleted: boolean = false;
  orderFailed: boolean = false;
  invalidItemName:string;
  isLoading: boolean = false;

  constructor(
    private orderService: OrderService,
    private authService: AuthService
  ) {}

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
      this.totalPrice += item.price * item.quantity;
    });
  }

  onRemoveItem(index: number) {
    this.orderService.removeItemFromCart(index);
  }

  onClearCart() {
    this.hasNote = false;
    this.orderService.clearShoppingCart();
  }

  onChangeQuantity(operation: string, index: number) {
    if (this.shoppingCart[index].quantity == 1 && operation == '-') {
      return;
    }

    this.orderService.changeItemQuantity(operation, index);
  }

  onSubmitOrder() {
    if (!this.authService.isLoggedIn()) {
      this.orderService.handleGuestOrder();
    } else
      this.orderService.submitOrder().subscribe(
        (res) => {
          // UX: Display loading spinner for 500ms and then success message / fail message
          this.isLoading = true;
          setTimeout(() => {
            this.isLoading = false;
            this.orderCompleted = true;
            this.orderFailed = false;
            this.onClearCart();
          }, 500);
        },
        (errResponse) => {
          this.isLoading = true;
          this.invalidItemName = errResponse.error.item;
          setTimeout(() => {
            this.isLoading = false;
            this.orderFailed = true;
            this.orderCompleted = false;
          }, 500);
        }
      );
  }

  async addNote() {
    const { value: text } = await Swal.fire({
      title: 'Add a personal note to the chef',
      icon: 'warning',
      input: 'textarea',
      inputPlaceholder: 'Type your note here',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Add'
    });
    if (text) {
      Swal.fire({
        title: 'Note added',
        icon: 'success'
      })
      this.orderService.currentNote = text
      this.hasNote = true
    }
  }

}
