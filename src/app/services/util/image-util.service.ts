import {Injectable} from '@angular/core';
import {AngularFireStorage, AngularFireUploadTask} from '@angular/fire/storage';
import * as firebase from 'firebase';
import {Observable} from 'rxjs';
import {finalize, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ImageUtilService {

  constructor(
    private storage: AngularFireStorage
  ) {
  }

  // startImageupload(file) {
  //   const path = `public/images/products/${Date.now()}_${file.name}`;
  //
  //   const ref = this.storage.storage.ref(path);
  //
  //   this.task = this.storage.upload(path, file);
  //
  //   this.percentage = this.task.percentageChanges();
  //
  //   this.snapshot = this.task.snapshotChanges().pipe(
  //     tap(console.log),
  //     finalize(async () => {
  //       this.downloadUrl = await ref.getDownloadURL();
  //     })
  //   );
  //
  // }

  deleteImage(oldFilePath) {
    this.storage.storage.refFromURL(oldFilePath).delete();
  }

  // loadImage(imageUrl) {
  //   let storageRef = this.storage.ref(imageUrl);
  //   storageRef.getDownloadURL().subscribe(url => {
  //     url = this.imageUrl = url;
  //   })
  // }
}
