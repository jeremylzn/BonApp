import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AdminService } from '../shared/services/admin.service';
import { NavbarService } from '../shared/services/navbar.service';
import { Order } from '../shared/models/order.model';
import { Observable } from 'rxjs';
import { fade } from '../animations';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.css'],
  animations: [
    fade
  ]
})
export class ActivitiesComponent implements OnInit {
  details: boolean;
  allOrdersNotCompleted: Order[] = [];
  allOrdersCompleted: Order[] = [];
  isLoading: boolean = true;

  constructor(private AdminService: AdminService, private navbarService: NavbarService) {}

  ngOnInit(): void {
    this.navbarService.changeHeaderTitle('Active Orders') // Send the title to NavbarService
    this.allOrdersAndUsers();
    setTimeout(() => {
      this.isLoading = false;
    }, 500);
  }

  retrieveFlag(flag) {
    this.details = flag;
  }

  allOrdersAndUsers() {
    this.AdminService.getAllUsers().subscribe((res) => {});

    this.AdminService.getAllOrders().subscribe((res) => {
      this.allOrdersNotCompleted = this.AdminService.allOrdersNotCompleted;
      this.allOrdersCompleted = this.AdminService.allOrdersCompleted;
    });
  }

  orderCompleted() {
    var completed = { completed: !this.AdminService.currentOrder.completed };
    this.AdminService.UpdateOrder(completed).subscribe((res) => {});
    this.allOrdersAndUsers();
  }
}
