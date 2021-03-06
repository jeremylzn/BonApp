import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


import { Order } from '../../shared/models/order.model'
import { User } from '../../shared/models/login-response-data.model';
import { AdminService } from '../../shared/services/admin.service';



@Component({
  selector: 'app-ordercard',
  templateUrl: './ordercard.component.html',
  styleUrls: ['./ordercard.component.css']
})
export class OrdercardComponent implements OnInit {
  @Input() order: Order;
  @Input() index: number;
  @Output() sendFlag:EventEmitter<boolean>=new EventEmitter<boolean>();

  details:boolean=false;
  userCard:any;

  constructor(private AdminService: AdminService) {}

  ngOnInit(): void {
    // for(var user of this.AdminService.allUsers){
    //   if(user._id==this.order.customerID)
    //     this.userCard=user
    // }
    this.userCard = this.order.customerDetails
    setTimeout(() => {
      if(this.index===1){
        this.ChangeDetails(this.order);
      }
    }, 500);
  }

  ChangeDetails(order){
    this.details=true;
    this.sendFlag.emit(this.details);
    for(var key in order) this.AdminService.currentOrder[key]=order[key];
    for(var key in this.AdminService.currentOrder.customerDetails) this.AdminService.currentUser[key]=this.AdminService.currentOrder.customerDetails[key];
  }

}
