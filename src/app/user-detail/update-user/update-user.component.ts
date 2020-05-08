import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/users/user.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { ToastrService } from 'ngx-toastr';
import { AngularFirestore } from '@angular/fire/firestore';
import { ImageUtilService } from 'src/app/services/util/image-util.service';
import { User } from 'src/app/model/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent implements OnInit {

  user: User = new User;
  imageUrl: string = '';
  uploaded: boolean = false;

  constructor(
    private userService: UserService,
    private storage: AngularFireStorage,
    private toastr: ToastrService,
    private db: AngularFirestore,
    private imgService: ImageUtilService,
    private router: Router
  ) { }

  showCheck() {
    this.uploaded = true;
  }

  ngOnInit(): void {
    this.userService.getUser(localStorage.getItem('uid')).subscribe(actionArray => {
      this.user.displayName = actionArray.payload.get('displayName');
      this.user.email = actionArray.payload.get('email');
      this.user.dob = actionArray.payload.get('dob');
      this.user.emailVerified = actionArray.payload.get('emailVerified');
      this.user.name = actionArray.payload.get('name');
      this.user.surname = actionArray.payload.get('surname');
      this.user.role = actionArray.payload.get('role');

      this.loadImage(actionArray.payload.get('imageUrl'))
    });
  }


  tryEdit() {
    const inputNode: any = document.querySelector('#file');
    if (this.user.email == '') {
      this.toastr.error("Please enter an email", "Notification", {
        timeOut: 1700
      })
    }
    else if (!this.validateEmail(this.user.email)) {
      this.toastr.error("Your email is invalid", "Notification", {
        timeOut: 1700
      })
    }
    else if (this.user.displayName == '') {
      this.toastr.error("Please enter a display name", "Notification", {
        timeOut: 1700
      })
    }
    else if (this.user.name == '') {
      this.toastr.error("Please enter your name", "Notification", {
        timeOut: 1700
      })
    }
    else if (this.user.surname == '') {
      this.toastr.error("Please enter your surname", "Notification", {
        timeOut: 1700
      })
    }
    else if (this.user.dob == '') {
      this.toastr.error("Please enter your date of birth", "Notification", {
        timeOut: 1700
      })
    }
    else {
      let userInfo = {};
      userInfo['email'] = this.user.email;
      userInfo['displayName'] = this.user.displayName;
      userInfo['name'] = this.user.name;
      userInfo['surname'] = this.user.surname;
      userInfo['dob'] = this.user.dob;
      this.userService.updateCurrentUserEmail(this.user.email);
      if (inputNode.files.length == 0) {
        this.db.doc(`users/${localStorage.getItem('uid')}`).update(userInfo);
        this.showSuccess();
      }
      else {
        let file: File = inputNode.files[0];
        let pathToDownload: string = this.imgService.startImageupload(file);

        let pathToImage = `public/images/profile_photos/${this.imageUrl}`
        let imageRef = this.storage.ref(pathToImage);
        imageRef.delete().subscribe(function () {
          console.log('file-deleted')
        })
        userInfo['imageUrl'] = pathToDownload;
        this.db.doc(`users/${this.user.uid}`).update(userInfo);
        this.showSuccess();
      }
    }
  }

  loadImage(imageUrl) {
    let storageRef = this.storage.ref(imageUrl);
    storageRef.getDownloadURL().subscribe(url => {
      url = this.imageUrl = url;
    })
  }

  validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  showSuccess(){
    this.toastr.success("You have succesfully edited your account", "Notification", {
      timeOut: 1700
    })
    this.router.navigate(['/myProfile'])
  }

}
