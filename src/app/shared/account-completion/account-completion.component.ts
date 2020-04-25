import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage, AngularFireUploadTask, createStorageRef } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { tap, finalize } from 'rxjs/operators';

@Component({
  selector: 'app-account-completion',
  templateUrl: './account-completion.component.html',
  styleUrls: ['./account-completion.component.scss']
})
export class AccountCompletionComponent implements OnInit, OnDestroy {

  accountCompletionForm: FormGroup;
  uploaded: boolean = false;
  productImage: string = '';
  productGallery: string[] = [];

  task: AngularFireUploadTask;
  snapshot: Observable<any>;
  downloadURL: string[] = [];

  constructor(
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private db: AngularFirestore,
    private storage: AngularFireStorage
  ) {
    this.createCompletionForm();
  }

  createCompletionForm() {
    this.accountCompletionForm = this.formBuilder.group({
      displayName: ['', Validators.required],
      name: ['', Validators.required],
      surname: ['', Validators.required],
      dob: ['', Validators.required]
    });
  }

  showCheck() {
    this.uploaded = true;
  }


  ngOnDestroy(): void {
    localStorage.clear();
  }

  ngOnInit(): void {
  }

  get f() { return this.accountCompletionForm.controls }

  tryRegister() {
    const inputNode: any = document.querySelector('#file');
    if (inputNode.files.lenth == 0) {
      this.toastr.error("Please upload a profile photo", "Notification", {
        timeOut: 1700
      })
    }
    else if (this.f.displayName.value == '') {
      this.toastr.error("Please enter a display name", "Notification", {
        timeOut: 1700
      })
    }
    else if (this.f.name.value == '') {
      this.toastr.error("Please enter your name", "Notification", {
        timeOut: 1700
      })
    }
    else if (this.f.surname.value == '') {
      this.toastr.error("Please enter your surname", "Notification", {
        timeOut: 1700
      })
    }
    else if (this.f.dob.value == '') {
      this.toastr.error("Please enter your date of birth", "Notification", {
        timeOut: 1700
      })
    }
    else {
      let userInfo = {};
      let file: File = inputNode.files[0];
      let filePath: string = '';
      if(this.startImageupload(file) == ''){
        this.toastr.error("There was an issue uploading your image", "Notification", {
          timeOut: 1200
        })
      }
      else{
        filePath = this.startImageupload(file);
      }

      let email = localStorage.getItem('email')
      let password = localStorage.getItem('password')

      userInfo['displayName'] = this.f.displayName.value;
      userInfo['name'] = this.f.name.value;
      userInfo['surname'] = this.f.surname.value;
      userInfo['dob'] = this.f.dob.value;
      userInfo['role'] = 'user';
      userInfo['imageUrl'] = filePath;

      this.authService.doRegister(email, password, userInfo);
      this.toastr.success("Welcome to Rosa Carter", "Notification", {
        timeOut: 1700
      })
      localStorage.clear();
      this.router.navigate(['/login']);

    }

  }

  startImageupload(file) {

    const pathToUpload = `public/images/profile_photos/${Date.now()}_${file.name}`;

    const ref = this.storage.ref(pathToUpload);

    ref.getDownloadURL.toString

    this.task = this.storage.upload(pathToUpload, file);
    return pathToUpload;
  }

}
