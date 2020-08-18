import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrderComponent implements OnInit {
  orderForm: FormGroup;

  constructor() {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.orderForm = new FormGroup({
      item: new FormControl(''),
      amount: new FormControl(''),
    });
  }

  onSubmit() {
    console.log(this.orderForm.value);
  }
}
