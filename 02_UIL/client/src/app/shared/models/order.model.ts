import { MenuItem } from './menu-item.model';

export interface Order {
    _id:string;
    completed: boolean;
    customerID: string;
    date:string;
    items:MenuItem[];
    time?:string;
    totalPrice?:number;
  }
  