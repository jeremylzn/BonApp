import { Component, OnInit } from '@angular/core';
import { fade } from '../../animations';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { MenuItem } from '../../shared/models/menu-item.model';
import { NavbarService } from '../../shared/services/navbar.service';
import { OrderService } from '../../shared/services/order.service';
import { MenuService } from '../../shared/services/menu.service';


@Component({
  selector: 'app-menumanager',
  templateUrl: './menumanager.component.html',
  styleUrls: ['./menumanager.component.css'],
  animations: [
    fade
  ]
})
export class MenumanagerComponent implements OnInit {
  menu: MenuItem[];
  public name = ''


  constructor(private orderService: OrderService, private navbarService:NavbarService, private menuService:MenuService) { }

  ngOnInit(): void {
    this.navbarService.changeHeaderTitle('Menu Manager') // Send the title to NavbarService

    this.menu = this.orderService.getMenu();
  }

  addItemMenu(){
    Swal.mixin({
      title: 'Insert new item',
      confirmButtonText: 'Next &rarr;',
      showCancelButton: true,
      progressSteps: ['1', '2', '3', '4', '5']
    }).queue([
      {
        text: 'Name :',
        input: 'text'
      },
      {
        text: 'Category :',
        input: 'select',
        inputOptions: {
          1:'Drink',
          2:'Food',
          3:'Meal',
          4:'Combo'
        }
      },
      {
        text: 'Description :',
        input: 'text'
      },
      {
        text: 'Price :',
        input: 'number'
      },
      {
        text: 'Image Path :',
        input: 'text',
      },
    ]).then((result) => {
        const answers = {
          'name':result.value[0],
          'type':parseInt(result.value[1]),
          'description':result.value[2],
          'price':parseInt(result.value[3]),
          'imagePath':result.value[4]
        }
        this.menuService.addItemMenu(answers).subscribe((res) => {console.log(res)},(errResponse) => console.log(errResponse.error.error));
        Swal.fire({
          title :'Updated!',
          text : 'The menu has been updated.',
          icon : 'success'
        })
        this.menuService.getAllMenu().subscribe((res) => {});
    })
  }

}
