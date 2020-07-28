import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/services/user.service';
import { User } from '../shared/models/user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public user:User;
  constructor(private UserService : UserService) { 
    this.user=this.UserService.user
  }

  ngOnInit(): void {
    this.Home();
  }

  public Home(){
    this.UserService.GetHome()
    .subscribe(res=>{console.log(res);}, err=>{console.log(err);})
  }

}
