import { Component, OnDestroy, OnInit } from '@angular/core';
import { fade } from '../animations';

import { MenuItem } from '../shared/models/menu-item.model';
import { Menu } from '../shared/models/menu.model';
import { NavbarService } from '../shared/services/navbar.service';
import { OrderService } from '../shared/services/order.service';
import { Categories } from '../shared/categories.enum';
import { MenuService } from '../shared/services/menu.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
  animations: [fade],
})
export class OrderComponent implements OnInit, OnDestroy {
  menuSubscription: Subscription;
  menuArray: MenuItem[];
  menuObject = new Menu();
  menu = [];

  constructor(
    private orderService: OrderService,
    private navbarService: NavbarService,
    private menuService: MenuService
  ) {}

  ngOnInit(): void {
    this.navbarService.changeHeaderTitle('Order Now'); // Send the title to NavbarService

    this.menuService.getAllMenu();

    this.menuSubscription = this.menuService.menuChanged.subscribe((newMenu) => {
      this.menuArray = newMenu;

      this.menuArray.forEach((menuItem) => {
        this.menuObject[Categories[menuItem.type]].push(menuItem);
      });

      this.menu = Object.entries(this.menuObject);
      console.log(this.menu);
    });
  }

  onAddItemToCart(item: MenuItem) {
    this.orderService.addItemToCart({ name: item.name, price: item.price });
  }

  ngOnDestroy() {
    this.menuSubscription.unsubscribe();
  }
}
