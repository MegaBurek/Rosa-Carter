import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {Order} from '../../model/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  ordersCollection: AngularFirestoreCollection<Order>;

  constructor(
    private db: AngularFirestore
  ) {
  }

  createOrder(order) {
    return this.db.collection('orders').add(order);
  }

  getMyOrders(id) {
    this.ordersCollection = this.db.collection('orders', ref => ref.where('owner', '==', id));
    return this.ordersCollection.valueChanges();
  }

  getOrderById(id) {
    return this.db.collection('orders').doc(id).get();
  }
}
