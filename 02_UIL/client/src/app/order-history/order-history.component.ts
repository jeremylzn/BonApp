import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { fade } from '../animations';

import { Order } from '../shared/models/order.model';
import { NavbarService } from '../shared/services/navbar.service';
import { OrderService } from '../shared/services/order.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css'],
  animations: [fade],
})
export class OrderHistoryComponent implements OnInit {
  orderHistory: Order[] = [];

  constructor(
    private orderService: OrderService,
    private router: Router,
    private navbarService: NavbarService
  ) {}

  ngOnInit(): void {
    this.navbarService.changeHeaderTitle('Order History'); // Send the title to NavbarService

    this.orderService.getOrderHistory().subscribe((orderHistory: Order[]) => {
      this.orderHistory = orderHistory.reverse();
    });
  }

  onOrderNow() {
    this.router.navigate(['/order']);
  }
}
