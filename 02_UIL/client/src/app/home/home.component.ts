import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth/auth.service';
import { User } from '../shared/models/auth/user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  public user: User;
  public name: String;

  constructor(private AuthService: AuthService) {}

  ngOnInit(): void {
    this.Home();
  }

  public Home() {
    this.AuthService.GetHome().subscribe(
      (res) => (this.name = res['name']),
      (err) => {
        console.log(err);
      }
    );
  }
}
