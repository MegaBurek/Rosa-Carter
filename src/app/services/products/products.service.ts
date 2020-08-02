import {Injectable} from '@angular/core';
import {AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore} from '@angular/fire/firestore';
import {Product} from 'src/app/model/product';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import Timestamp = firebase.firestore.Timestamp;
import firebase from 'firebase';

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
      .then(docRef => {
        docRef.set({uid: docRef.id}, {merge: true}).then(() => {
          this.toastr.success('Successfully added a product', 'Notification');
          this.router.navigate(['/product' + `/${docRef.id}`]);
        });
      })
      .catch(e => {
        this.toastr.error('Error with adding product', 'Notification');
        console.error('Error writing document: ', e.message);
      });
  }

  getProductById(id) {
    return this.db.collection('products').doc(id).get();
  }

  getAllBras() {
    this.productCollection = this.db.collection('products', ref => ref.where('type', '==', 'Bra'));
    return this.productCollection.valueChanges();
  }

  getNewArrivals() {
    this.productCollection = this.db.collection('products', ref =>
      ref.limit(5)
        .orderBy('dateCreated'));
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
