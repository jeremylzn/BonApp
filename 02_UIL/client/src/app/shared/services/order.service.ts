import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import Swal from 'sweetalert2/dist/sweetalert2.js';

import { MenuItem } from '../models/menu-item.model';
import { Order } from '../models/order.model';
import { NotificationsService } from './notifications.service';
import { AuthService } from './auth.service';

interface GuestCustomerDetails {
  name: string;
  phone: string;
  address?: string;
  isGuest?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  readonly rootUrl = 'http://localhost:3000/';
  cartChanged = new Subject<MenuItem[]>();
  menu: MenuItem[] = [];
  currentNote: String = '';

  private shoppingCart: MenuItem[] = [];

  constructor(
    private http: HttpClient,
    private router: Router,
    private notificationService: NotificationsService,
    private authService: AuthService
  ) {}

  getMenu() {
    return this.menu;
  }

  getCart() {
    return this.shoppingCart;
  }

  // This function gets a new item, checks if it already exists in the shopping cart and adds it accordingly.
  addItemToCart(item: MenuItem) {
    let index = this.shoppingCart.findIndex(
      (element) => element.name == item.name
    );
    if (index === -1) {
      this.shoppingCart.push({
        ...item,
        quantity: item.quantity > 1 ? item.quantity : 1,
      });
    } else {
      this.shoppingCart[index].quantity +=
        item.quantity > 1 ? item.quantity : 1;
    }

    this.cartChanged.next(this.shoppingCart);
  }

  removeItemFromCart(index: number) {
    this.shoppingCart.splice(index, 1);
    this.cartChanged.next(this.shoppingCart);

    console.log(this.shoppingCart);
  }

  changeItemQuantity(operation: string, index: number) {
    if (operation == '+') {
      this.shoppingCart[index].quantity++;
    } else {
      this.shoppingCart[index].quantity--;
    }
    this.cartChanged.next(this.shoppingCart);
  }

  clearShoppingCart() {
    this.shoppingCart = [];
    this.currentNote = '';
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

  submitOrder(guestCustomerDetails?: GuestCustomerDetails) {
    let customerDetails = this.authService.isLoggedIn()
      ? this.authService.getUserDetails()
      : guestCustomerDetails;

    console.log(customerDetails);

    return this.http
      .post<any>(this.rootUrl + 'orders', {
        items: this.shoppingCart,
        customerDetails: customerDetails,
        notes: this.currentNote,
      })
      .pipe(
        tap((res) => {
          console.log(res);
          if (this.authService.isLoggedIn()) {
            this.notificationService.addNotification({
              title: `Order #${res.order.orderID} placed`,
              date: `${res.order.date} | ${res.order.time}`,
              seen: false,
            });
          }

          // UX: 500ms delay
          setTimeout(() => this.clearShoppingCart(), 500);
        })
      );
  }

  handleGuestOrder() {
    Swal.fire({
      title: 'Enter guest info',
      html: `<input type="text" id="name" class="swal2-input" placeholder="Full name">
      <input type="text" id="phone" class="swal2-input" placeholder="Phone number">
      <input type="text" id="address" class="swal2-input" placeholder="Address">`,
      confirmButtonText: 'Submit',
      showCancelButton: true,
      focusConfirm: false,
      preConfirm: () => {
        const name = Swal.getPopup().querySelector('#name').value;
        const phone = Swal.getPopup().querySelector('#phone').value;
        const address = Swal.getPopup().querySelector('#address').value;
        if (!name || !phone) {
          Swal.showValidationMessage(`Please enter your details`);
        }
        return { name: name, phone: phone, address: address };
      },
    })
      .then((result) => {
        Swal.fire({
          title: `Thank you, ${result.value.name}!`,
          text: 'Your order has been successfully placed.',
          icon: 'success',
          confirmButtonText: 'OK'
        }).then(() => {
          this.submitOrder({
            name: result.value.name,
            phone: result.value.phone,
            address: result.value.address,
            isGuest: true,
          }).subscribe(() => {
            this.clearShoppingCart();
          });
        })

        
      })
      .catch((err) => {});
  }
}
