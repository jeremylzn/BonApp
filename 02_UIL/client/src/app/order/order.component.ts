import { Component, OnInit } from '@angular/core';
import { fade } from '../animations';

import { MenuItem } from '../shared/models/menu-item.model';
import { NavbarService } from '../shared/services/navbar.service';
import { OrderService } from '../shared/services/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
  animations: [
    fade
  ]
})
export class OrderComponent implements OnInit {
  menu: MenuItem[];

  constructor(private orderService: OrderService, private navbarService:NavbarService) {}

  ngOnInit(): void {
    this.navbarService.changeHeaderTitle('Order Now') // Send the title to NavbarService

    this.menu = this.orderService.getMenu();
  }

  onAddItemToCart(item: MenuItem) {
    this.orderService.addItemToCart({ name: item.name, price: item.price });
  }
}
