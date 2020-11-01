import { MenuItem } from './menu-item.model';

export class Menu {
  public Appetizers: MenuItem[];
  public Main: MenuItem[];
  public Sides: MenuItem[];
  public Desserts?: MenuItem[];
  public Combos?: MenuItem[];
  public Drinks?: MenuItem[];
  public Alcohol?: MenuItem[];
  constructor() {
    this.Appetizers = [];
    this.Main = [];
    this.Sides = [];
    this.Desserts = [];
    this.Combos = [];
    this.Drinks = [];
    this.Alcohol = [];
  }
}
