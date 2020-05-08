import { Injectable, NgZone } from "@angular/core";
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { User } from 'src/app/model/user.model';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class AuthService {

  constructor(
   public afAuth: AngularFireAuth,
   public fireStore: AngularFirestore,
   public ngZone: NgZone,
   public router: Router,
   private toastr: ToastrService
 ){}

  doRegister(email, password, userInfo){
    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(email,password)
      .then((res) => {
        console.log(res)
        resolve(res);
        this.SetUserData(res.user, userInfo);
      }, err => 
      this.toastr.error(err.message, "Notification", {
        timeOut: 1700
      }))
    })
  }

  SetUserData(user, userInfo) {
    const userRef: AngularFirestoreDocument<any> = this.fireStore.doc(`users/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      email: user.email,
      imageUrl: userInfo.imageUrl,
      displayName: userInfo.displayName,
      role: userInfo.role,
      name: userInfo.name,
      surname: userInfo.surname,
      dob: userInfo.dob,
      orders: [],
      emailVerified: user.emailVerified,
    }
    return userRef.set(userData, {
      merge: true
    })
  }

  UpdateUserData(user, userInfo){
    const userRef: AngularFirestoreDocument<any> = this.fireStore.doc(`users/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      email: user.email,
      imageUrl: userInfo.imageUrl,
      displayName: userInfo.displayName,
      role: userInfo.role,
      name: userInfo.name,
      surname: userInfo.surname,
      dob: userInfo.dob,
      orders: [],
      emailVerified: user.emailVerified,
    }
    return userRef.update(userData);
  }

  doLogin(value){
    return new Promise<any>((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(value.email, value.password)
      .then(res => {
        resolve(res);
      }, err => reject(err))
    })
  }

  doLogout(){
    return new Promise((resolve, reject) => {
      if(firebase.auth().currentUser){
        this.afAuth.auth.signOut();
        resolve();
      }
      else{
        reject();
      }
    });
  }

  isLoggedIn(){
    let user = firebase.auth().currentUser;
    if(user != null){
      return true;
    }
    return false;
  }

  getLoggedInID(){
    let user = firebase.auth().currentUser;
    return user.uid;
  }


}
