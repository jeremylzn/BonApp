import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from 'src/app/shared/models/order.model';
import { OrderService } from 'src/app/shared/services/order.service';
import * as moment from 'moment';
moment().format();

@Component({
  selector: 'app-history-item',
  templateUrl: './history-item.component.html',
  styleUrls: ['./history-item.component.css'],
})
export class HistoryItemComponent implements OnInit {
  @Input() order: Order;
  orderTime: string;

  constructor(private orderService: OrderService, private router: Router) {}

  ngOnInit(): void {
    this.orderTime = moment(new Date(`${this.order.date} ${this.order.time}`)).format('DD/MM/YY | hh:mm');
  }

  onReorder() {
    this.orderService.reOrder(this.order.items);
  }
}
