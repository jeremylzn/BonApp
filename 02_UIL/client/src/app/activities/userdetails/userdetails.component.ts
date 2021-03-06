import { Component, OnInit } from '@angular/core';

import { User } from '../../shared/models/login-response-data.model';
import { AdminService } from '../../shared/services/admin.service';

@Component({
  selector: 'app-userdetails',
  templateUrl: './userdetails.component.html',
  styleUrls: ['./userdetails.component.css']
})
export class UserdetailsComponent implements OnInit {
  public currentUser:any;


  constructor(private adminService: AdminService) {
  }

  ngOnInit(): void {
    this.currentUser=this.adminService.currentUser
  }

}
