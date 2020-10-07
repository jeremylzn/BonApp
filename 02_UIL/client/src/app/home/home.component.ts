import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthService } from '../shared/services/auth.service';
import { NavbarService } from '../shared/services/navbar.service';

import { fade } from '../animations';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    fade
  ]
})
export class HomeComponent implements OnInit {
  public userSubscription = new Subscription();
  public userName: String;

  constructor(private authService: AuthService, private navbarService:NavbarService) {}

  ngOnInit(): void {
    this.navbarService.changeHeaderTitle('Home') // Send the title to NavbarService

    this.getUserName();
  }

  public getUserName() {
    this.userSubscription = this.authService.user.subscribe((user) => {
      if (user) this.userName = user.name;
      else this.userName = 'Guest';
    });
  }
}
