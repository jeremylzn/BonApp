import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/login-response-data.model';
import { AdminService } from 'src/app/shared/services/admin.service';
import { NavbarService } from 'src/app/shared/services/navbar.service';

@Component({
  selector: 'app-usermanager',
  templateUrl: './usermanager.component.html',
  styleUrls: ['./usermanager.component.css']
})
export class UsermanagerComponent implements OnInit {
  allUsers: User[] = [];
  isLoading: boolean = true;



  constructor(private navbarService:NavbarService, private adminService:AdminService) { }

  ngOnInit(): void {
    this.navbarService.changeHeaderTitle('User Manager') // Send the title to NavbarService

    this.adminService.getAllUsers().subscribe((res) => {this.allUsers=this.adminService.allUsers
    console.log(this.allUsers)});
    setTimeout(() => {
      this.isLoading = false;
    }, 500);

  }

}
