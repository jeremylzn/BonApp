import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { MenuItem } from '../shared/models/menu-item.model';
import { OrderService } from '../shared/services/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrderComponent implements OnInit {
  orderForm: FormGroup;
  menu: MenuItem[];

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.initForm();
    this.menu = this.orderService.getMenu();
  }

  initForm() {
    this.orderForm = new FormGroup({
      item: new FormControl(''),
      amount: new FormControl(''),
    });
  }

  onSubmit() {
    console.log(this.orderForm.value);
  }

  onAddItemToCart(item: MenuItem) {
    this.orderService.addItemToCart(item);
  }
}
