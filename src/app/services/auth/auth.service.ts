import {Injectable, NgZone} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {User} from 'src/app/model/user.model';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {Store} from '@ngxs/store';
import {GetAllBras, GetLatestProducts} from '../../store/products/products.actions';
import {Observable} from 'rxjs';
import {UserState} from '../../store/user/user.state';

@Injectable()
export class AuthService {

  constructor(
    public afAuth: AngularFireAuth,
    private db: AngularFirestore,
    public router: Router,
    private toastr: ToastrService,
    private store: Store
  ) {
  }

  doRegister(newUser, password) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(newUser.email, password)
        .then((res) => {
          resolve(res);
        }, err =>
          this.toastr.error(err.message, 'Notification', {
            timeOut: 1700
          }));
    });
  }

  // UpdateUserData(user, userInfo) {
  //   const userRef: AngularFirestoreDocument<any> = this.db.doc(`users/${user.uid}`);
  //   const userData: User = {
  //     uid: user.uid,
  //     email: user.email,
  //     imageUrl: userInfo.imageUrl,
  //     displayName: userInfo.displayName,
  //     role: userInfo.role,
  //     name: userInfo.name,
  //     surname: userInfo.surname,
  //     dob: userInfo.dob,
  //     orders: [],
  //     emailVerified: user.emailVerified,
  //   };
  //   return userRef.update(userData);
  // }

  doLogin(value) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(value.email, value.password)
        .then(res => {
          this.store.dispatch(new GetLatestProducts());
          resolve(res);
        }, err => reject(err));
    });
  }

  isAdminLogged(){
    let role = '';
    this.store.select(state => state.user.loggedInUser.role).subscribe((value) => {
      role = value;
    });
    if (role === 'admin') {
      return true;
    } else {
      return false;
    }
  }

  doLogout() {
    return new Promise((resolve, reject) => {
      if (firebase.auth().currentUser) {
        this.afAuth.auth.signOut();
        resolve();
      } else {
        reject();
      }
    });
  }

  isLoggedIn() {
    const user = firebase.auth().currentUser;
    if (user != null) {
      return true;
    }
    return false;
  }

  getLoggedInID() {
    const userId = firebase.auth().currentUser.uid;
    if (userId != null) {
      return userId;
    }
  }


}
