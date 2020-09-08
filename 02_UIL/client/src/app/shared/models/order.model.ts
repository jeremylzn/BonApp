import { MenuItem } from './menu-item.model';

export interface Order {
    completed: boolean;
    customerID: string;
    date:string;
    items:MenuItem[];
    time?:string;
    totalPrice?:number;
  }
  