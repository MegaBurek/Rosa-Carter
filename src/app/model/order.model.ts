import {ShoppingCartItem} from './shopping-cart-item';

export class Order {
  uid: string;
  shoppingCartItems: ShoppingCartItem[];
  dateOrdered: Date;
  owner: string;
  ownerName: string;
  status: string;
}
