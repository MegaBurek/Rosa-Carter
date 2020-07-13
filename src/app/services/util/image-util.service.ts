import {Injectable} from '@angular/core';
import {AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask} from '@angular/fire/storage';
import * as firebase from 'firebase';
import {finalize} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageUtilService {

  downloadUrl: Observable<string>;

  constructor(
    private storage: AngularFireStorage
  ) {
  }

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
