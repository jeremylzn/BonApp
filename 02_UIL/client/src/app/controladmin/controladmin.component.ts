import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../shared/services/navbar.service';


@Component({
  selector: 'app-controladmin',
  templateUrl: './controladmin.component.html',
  styleUrls: ['./controladmin.component.css']
})
export class ControladminComponent implements OnInit {

  constructor(private navbarService:NavbarService) { }

  ngOnInit(): void {
    this.navbarService.changeHeaderTitle('Control Admin') // Send the title to NavbarService

  }

}
