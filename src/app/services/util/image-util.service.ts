import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class ImageUtilService {

  constructor(
    private storage: AngularFireStorage
  ) { }

  startImageupload(file) {

    const pathToDownload = `public/images/profile_photos/${Date.now()}_${file.name}`;

    const ref = this.storage.ref(pathToDownload);

    ref.getDownloadURL.toString

    this.storage.upload(pathToDownload, file);
    return pathToDownload;
  }

  // loadImage(imageUrl) {
  //   let storageRef = this.storage.ref(imageUrl);
  //   storageRef.getDownloadURL().subscribe(url => {
  //     url = this.imageUrl = url;
  //   })
  // }
}
