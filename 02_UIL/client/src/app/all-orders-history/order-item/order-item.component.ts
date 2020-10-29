import { Component, Input, OnInit } from '@angular/core';
import { Order } from 'src/app/shared/models/order.model';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'tr[app-order-item]',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.css']
})
export class OrderItemComponent implements OnInit {
  @Input() order: Order;


  constructor() { }

  ngOnInit(): void {
  }

  showItem(items) {
    var listItems = ''
    for (var item of items) {
      listItems += '<tr class="text-center">'+
                      '<td>'+ item.name +'</td>'+
                      '<td>'+ item.quantity +'</td>'+
                      '<td>₪'+ item.price +'</td>'+
                    '</tr>'}

    var html = '<table class="table table-hover">'+
                '<thead class="thead-light">'+
                  '<tr class="text-center">'+
                    '<th> Item </th>'+
                    '<th> Quantity </th>'+
                    '<th> Price </th>'+
                    '</tr>'+
                '</thead>'+
                '<tbody>'+
                  listItems +
                '</tbody>'+
                '</table>'
    Swal.fire({
      title: 'Order items',
      html: html,
      type: 'warning',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'OK',
    });
  }

}
