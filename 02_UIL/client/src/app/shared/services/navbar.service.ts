import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  newTitle = new Subject<string>();


  constructor() { }

  changeHeaderTitle(componentName) {
    this.newTitle.next(componentName);
  }
}
