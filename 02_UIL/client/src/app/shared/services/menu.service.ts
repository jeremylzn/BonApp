import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MenuItem } from '../models/menu-item.model';
import { OrderService } from './order.service';
import { tap } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  readonly rootUrl = 'http://localhost:3000/';
  menuChanged = new Subject<MenuItem[]>();

  constructor(private http: HttpClient, private orderService: OrderService) {}

  getAllMenu() {
    this.http
      .get<MenuItem[]>(this.rootUrl + 'menu')
      .pipe(
        tap((res) => {
          // for(var key in res) this.orderService.menu[key]=res[key];
          this.menuChanged.next(res);
        })
      )
      .subscribe();
  }

  addItemMenu(item) {
    return this.http.post(this.rootUrl + 'add/menu', item);
  }

  removeItemMenu(id) {
    return this.http.delete(this.rootUrl + `delete/menu/${id}`).pipe(
      tap((res) => {
        this.orderService.menu.forEach((value, index) => {
          if (value._id == res['_id']) {
            this.orderService.menu.splice(index, 1);
          }
        });
        this.menuChanged.next(this.orderService.menu);
      })
    );
  }
}
