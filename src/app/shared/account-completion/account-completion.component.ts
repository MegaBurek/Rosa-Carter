import {Component, OnInit, OnDestroy} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from 'src/app/services/auth/auth.service';
import {ToastrService} from 'ngx-toastr';
import {ImageUtilService} from 'src/app/services/util/image-util.service';
import {fadeInAnimation} from '../../_animations/fade-in.animation';
import {User} from '../../model/user.model';
import {AngularFirestore} from '@angular/fire/firestore';

@Component({
  selector: 'app-account-completion',
  templateUrl: './account-completion.component.html',
  styleUrls: ['./account-completion.component.scss'],
  animations: [fadeInAnimation],
  host: {'[@fadeInAnimation]': ''}
})
export class AccountCompletionComponent implements OnInit, OnDestroy {

  check = false;
  selectedFile: File;
  percentage: number;
  downloadUrl;

  newUser: User = {
    uid: null,
    email: '',
    imageUrl: '',
    displayName: '',
    phoneNumber: '',
    role: 'user',
    name: '',
    surname: '',
    dob: '',
    orders: [],
    emailVerified: false
  };

  constructor(
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private imgSerivce: ImageUtilService,
    private firestore: AngularFirestore
  ) {
  }

  ngOnDestroy(): void {
    localStorage.clear();
  }

  ngOnInit(): void {
  }

  onFileSelected(event) {
    this.selectedFile = event.target.files[0] as File;
    if (this.selectedFile != null) {
      this.check = true;
    }
  }

  tryRegister() {
    const inputNode: any = document.querySelector('#file');
    if (inputNode.files.lenth === 0) {
      this.toastr.error('Please upload a profile photo', 'Notification', {
        timeOut: 1700
      });
    } else if (this.newUser.displayName === '') {
      this.toastr.error('Please enter a display name', 'Notification', {
        timeOut: 1700
      });
    } else if (this.newUser.phoneNumber === '') {
      this.toastr.error('Please enter a phone number', 'Notification', {
        timeOut: 1700
      });
    } else if (parseInt(this.newUser.phoneNumber.valueOf(), 10) < 8) {
      this.toastr.error('Please enter a valid phone number', 'Notification', {
        timeOut: 1700
      });
    } else if (this.newUser.name === '') {
      this.toastr.error('Please enter your name', 'Notification', {
        timeOut: 1700
      });
    } else if (this.newUser.surname === '') {
      this.toastr.error('Please enter your surname', 'Notification', {
        timeOut: 1700
      });
    } else if (this.newUser.dob === '') {
      this.toastr.error('Please enter your date of birth', 'Notification', {
        timeOut: 1700
      });
    } else {
      const email = localStorage.getItem('email');
      const password = localStorage.getItem('password');

      this.newUser.phoneNumber = '+267' + this.newUser.phoneNumber;

      const file: File = inputNode.files[0];
      const n = Date.now();
      const storageRef = this.firestore.firestore.app.storage().ref(`public/images/profile_photos/${n}_${file.name}`);
      const task = storageRef.put(file);

      task.on('state_changed', (snapshot: any) => {
        this.percentage = (task.snapshot.bytesTransferred / task.snapshot.totalBytes) * 100;
      }, error => {
        console.error(error);
      }, () => {
        storageRef.getDownloadURL().then((url) => {
          this.newUser.imageUrl = url;
          this.newUser.email = email;
          this.authService.doRegister(this.newUser, password)
            .then((res) => {
              this.newUser.uid = res.user.uid;
              this.firestore.collection('users').doc(this.newUser.uid).set(this.newUser);
              this.toastr.success('Successfully registered', 'Notification');
              this.router.navigate(['/login']);
            }).catch(error => {
            console.error(error);
          });
        }).catch((error) => {
          switch (error.code) {
            case 'storage/object-not-found':
              console.log('File does not exist');
            case 'storage/unauthorized':
              console.log('No permission');
            case 'storage/canceled':
              console.log('Cancelled Upload');
          }
        });
      });
    }

  }

}
