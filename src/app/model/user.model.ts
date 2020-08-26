import {Order} from './order.model';

export class User {
  uid: string;
  email: string;
  imageUrl: string;
  displayName: string;
  phoneNumber: string;
  role: string;
  name: string;
  surname: string;
  dob: string;
  orders: Order[];
  emailVerified: boolean;
}
