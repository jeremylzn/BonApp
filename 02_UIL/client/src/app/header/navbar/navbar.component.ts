import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  isAuthenticated: boolean = false;
  userSubscription = new Subscription();
  userName: string;
  isAdmin: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.userSubscription = this.authService.user.subscribe((user) => {
      // The 500ms delay is for UX purposes only --------- keep?
      setTimeout(() => {
        this.isAuthenticated = user ? true : false;
        this.isAdmin=null;
        if (this.isAuthenticated){
          this.userName = user.name;
          if (user.isAdmin) this.isAdmin=true;
        } else this.userName = null;
      }, 500);
    });
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
}
