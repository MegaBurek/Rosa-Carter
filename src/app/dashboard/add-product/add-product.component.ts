import {Component, OnInit} from '@angular/core';
import {Product} from '../../model/product';
import {ToastrService} from 'ngx-toastr';
import {ProductsService} from '../../services/products/products.service';
import {ImageUtilService} from '../../services/util/image-util.service';
import {AngularFireStorage, AngularFireUploadTask} from '@angular/fire/storage';
import {Observable} from 'rxjs';
import {finalize, tap} from 'rxjs/operators';
import {FirebaseStorage} from '@angular/fire';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  newProduct: Product = {
    uid: null,
    name: '',
    desc: '',
    price: '',
    type: '',
    imageUrl: ''
  };

  check = false;
  selectedFile: File;
  task: AngularFireUploadTask;
  percentage: Observable<number>;
  snapshot: Observable<any>;
  downloadUrl: string;

  constructor(
    private toastr: ToastrService,
    private productService: ProductsService,
    private storage: AngularFireStorage,
    private router: Router
  ) {
  }

  ngOnInit(): void {
  }

  onFileSelected(event) {
    this.selectedFile = <File> event.target.files[0];
    if (this.selectedFile != null) {
      this.check = true;
    }
  }

  handleAddProduct(): void {
    const inputNode: any = document.querySelector('#file');
    if (inputNode.files.length === 0) {
      this.toastr.error('Please upload a product photo', 'Notification', {
        timeOut: 1700
      });
    } else if (this.newProduct.name === '') {
      this.toastr.error('Please enter the product name', 'Notification', {
        timeOut: 1700
      });
    } else if (this.newProduct.type === '') {
      this.toastr.error('Please enter a product type', 'Notification', {
        timeOut: 1700
      });
    } else if (this.newProduct.desc === '') {
      this.toastr.error('Please enter a product description', 'Notification', {
        timeOut: 1700
      });
    } else if (this.newProduct.price === '') {
      this.toastr.error('Please enter a product description', 'Notification', {
        timeOut: 1700
      });
    } else {
      const file: File = inputNode.files[0];
      const path = `public/images/products/${Date.now()}_${file.name}`;

      const ref = this.storage.storage.ref(path);

      this.task = this.storage.upload(path, file);

      this.percentage = this.task.percentageChanges().pipe(
        tap(console.log),
        finalize( async () => {
          this.newProduct.imageUrl = path;
          await this.productService.addProduct(this.newProduct);
        })
      );
    }
  }

}
