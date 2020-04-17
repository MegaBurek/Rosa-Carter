import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(
    private firestore: AngularFirestore
  ) { }

  createOrder(data){
    return new Promise<any>((resolve, reject) =>{
      this.firestore
          .collection("orders")
          .add(data)
          .then(res => {}, err => reject(err));
  });
  }
}
