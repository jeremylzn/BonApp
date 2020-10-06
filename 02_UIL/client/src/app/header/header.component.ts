import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../shared/services/navbar.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public title:string='';


  constructor(private navbarService: NavbarService) {
   }

  ngOnInit(): void {
    this.navbarService.newTitle.subscribe((newTitle) => {
      this.title = newTitle;
    });
  }

}
