import {Injectable} from '@angular/core';
import {AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore} from '@angular/fire/firestore';
import {Product} from 'src/app/model/product';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {BehaviorSubject, Observable} from "rxjs/index";
import {switchMap} from "rxjs/internal/operators";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  productCollection: AngularFirestoreCollection<Product>;

  constructor(
    private db: AngularFirestore,
    private toastr: ToastrService,
    private router: Router
  ) {
  }

  addProduct(product) {
    this.db.collection('products').add(product)
      .then(_ => {
        this.toastr.success('Successfully added a product', 'Notification');
        this.router.navigate(['/product']);
      })
      .catch(e => {
        this.toastr.error('Error with adding product', 'Notification');
        console.error('Error writing document: ', e.message);
      });
  }

  // getProductById(id) {
  //
  // }

  // getAllProducts() {
  //   this.productCollection = this.db.collection('products');
  //   return this.productCollection.valueChanges();
  // }

  getAllBras() {
    this.productCollection = this.db.collection('products', ref => ref.where('type', '==', 'Bra'));
    return this.productCollection.valueChanges();
  }

  getAllUndies() {
    this.productCollection = this.db.collection('products', ref => ref.where('type', '==', 'Undies'));
    return this.productCollection.valueChanges();
  }

  getAllSets() {
    this.productCollection = this.db.collection('products', ref => ref.where('type', '==', 'Set'));
    return this.productCollection.valueChanges();
  }
}
