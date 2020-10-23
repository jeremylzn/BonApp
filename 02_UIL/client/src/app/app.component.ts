import { Component, OnInit } from '@angular/core';
import { MenuService } from './shared/services/menu.service';
import { AuthService } from './shared/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { OrderService } from './shared/services/order.service'



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'BonApp';

  constructor(private authService: AuthService, private menuService:MenuService) {}

  ngOnInit() {
    this.authService.autoLogin();

    this.menuService.getAllMenu().subscribe((res) => {});

  }
}
