import {Component, OnInit} from '@angular/core';
import {Product} from '../../model/product';
import {ToastrService} from 'ngx-toastr';
import {ProductsService} from '../../services/products/products.service';
import {ImageUtilService} from '../../services/util/image-util.service';
import {AngularFireStorage, AngularFireUploadTask} from '@angular/fire/storage';
import {Observable} from 'rxjs';
import {finalize, tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {fadeInAnimation} from '../../_animations/fade-in.animation';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
  animations: [fadeInAnimation],
  host: {'[@fadeInAnimation]': ''}
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

  imageUrl: string = '';

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
      const pathUpload = `public/images/products/${Date.now()}_${file.name}`;


      this.task = this.storage.upload(pathUpload, file);

      this.percentage = this.task.percentageChanges().pipe(
        tap(console.log),
        finalize(async () => {
          await this.detDownloadUrl(pathUpload);
        })
      );
    }
  }

  detDownloadUrl(pathUpload) {
    let pathRef = this.storage.storage.ref(pathUpload);
    pathRef.getDownloadURL().then(url => {
      this.newProduct.imageUrl = url;
      this.productService.addProduct(this.newProduct);
    }).catch(error => {
      switch (error.code) {
        case 'storage/object-not-found':
          console.log('File does not exist');
        case 'storage/unauthorized':
          console.log('No permission');
        case 'storage/canceled':
          console.log('Cancelled Upload');
      }
    });
  }

}
