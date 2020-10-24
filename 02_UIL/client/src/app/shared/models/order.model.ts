import { MenuItem } from './menu-item.model';

export interface Order {
  _id: string;
  orderID: Number;
  items: MenuItem[];
  completed: boolean;
  customerID: string;
  date: string;
  customerDetails: string[];
  time?: string;
  totalPrice?: number;
}
