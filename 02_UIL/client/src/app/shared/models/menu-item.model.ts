export interface MenuItem {
  _id?:string;
  name: string;
  price: number;
  type?:number
  description?: string;
  imagePath?: string;
  quantity?: number;
}
