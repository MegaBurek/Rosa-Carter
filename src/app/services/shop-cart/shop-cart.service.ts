import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/model/product';
import { AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class ShopCartService {

  toastr: ToastrService;

  constructor(
    private db: AngularFirestore
  ) { }

  loadItems(){
    
  }

  addToCart(product){
    
  }

  removeFromCart(product){
    // const index = this.items.indexOf(product);
    // if (index > -1){
    //   this.items.splice(index, 1);
    // }
  }

  clearCart(){
    
  }
}
