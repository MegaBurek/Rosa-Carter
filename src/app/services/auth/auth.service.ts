import { Injectable, NgZone } from "@angular/core";
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { User } from 'src/app/model/user.model';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {

  constructor(
   public afAuth: AngularFireAuth,
   public fireStore: AngularFirestore,
   public ngZone: NgZone,
   public router: Router
 ){}

  doRegister(email, password, userInfo){
    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(email,password)
      .then((res) => {
        console.log(res)
        resolve(res);
        this.SetUserData(res.user, userInfo);
      }, err => console.log(err))
    })
  }

  createUser(user){
    return this.fireStore.collection('users').add(user);
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

  getLoggednIn(){
    return firebase.auth().currentUser;
  }

  getLoggedInID(){
    let user = firebase.auth().currentUser;
    return user.uid;
  }


}
