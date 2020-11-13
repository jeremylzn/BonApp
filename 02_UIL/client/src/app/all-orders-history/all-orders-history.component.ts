import { Component, OnInit } from '@angular/core';
import { Order } from '../shared/models/order.model';
import { AdminService } from '../shared/services/admin.service';
import { NavbarService } from '../shared/services/navbar.service';

@Component({
  selector: 'app-all-orders-history',
  templateUrl: './all-orders-history.component.html',
  styleUrls: ['./all-orders-history.component.css']
})
export class AllOrdersHistoryComponent implements OnInit {
  allOrders: Order[] = [];

  constructor(private adminService: AdminService, private navbarService: NavbarService) { }

  ngOnInit(): void {
    this.navbarService.changeHeaderTitle('All Orders History') // Send the title to NavbarService

    this.adminService.getAllOrders().subscribe((res) => {
      this.allOrders = this.adminService.allOrdersCompleted;
      this.allOrders.reverse();
    });

  }

}
