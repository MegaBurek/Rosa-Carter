import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import {AngularFireAuth} from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import {User} from 'src/app/model/user.model';
import {tap} from 'rxjs/operators';

@Injectable()
export class UserService {

  userCollection: AngularFirestoreCollection<User>;
  userDoc: AngularFirestoreDocument<User>;

  user: User = new User;

  constructor(
    public db: AngularFirestore,
    public afAuth: AngularFireAuth
  ) {
  }


  getCurrentUser() {
    return new Promise<any>((resolve, reject) => {
      var user = firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          resolve(user);
        } else {
          reject('No user logged in');
        }
      });
    });
  }

  updateCurrentUser(value) {
    return new Promise<any>((resolve, reject) => {
      var user = firebase.auth().currentUser;
      user.updateProfile({
        displayName: value.name,
        photoURL: user.photoURL
      }).then(res => {
        resolve(res);
      }, err => reject(err));
    });
  }

  updateCurrentUserEmail(value) {
    return new Promise<any>((resolve, reject) => {
      var user = firebase.auth().currentUser;
      user.updateEmail(value).then(res => {
        resolve(res);
      }, err => reject(err));
    });
  }

  updateCurrentUserPassword(value) {
    return new Promise<any>((resolve, reject) => {
      var user = firebase.auth().currentUser;
      user.updatePassword(value).then(res => {
        resolve(res);
      }, err => reject(err));
    });
  }

  getUserById(id: string) {
    return this.db.doc('users/' + id).snapshotChanges();
  }
}
