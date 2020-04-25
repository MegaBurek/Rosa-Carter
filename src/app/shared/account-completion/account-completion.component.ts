import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
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
  file: File;

  task: AngularFireUploadTask;
  snapshot: Observable<any>;
  downloadURL: string[] = JSON.parse(localStorage.getItem("imgURL"));

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
      if (typeof (FileReader) !== 'undefined') {
        const reader = new FileReader();

        reader.onload = (e: any) => {
          this.file = e.target.result;
        };
        reader.readAsArrayBuffer(inputNode.files[0]);
        this.startImageupload(this.file);
      }

      this.productGallery = JSON.parse(localStorage.getItem("imgURL"));

      this.productImage = this.productGallery[0];

      let email = localStorage.getItem('email')
      let password = localStorage.getItem('password')


      userInfo['imageUrl'] = this.productImage;
      userInfo['displayName'] = this.f.displayName.value;
      userInfo['name'] = this.f.name.value;
      userInfo['surname'] = this.f.surname.value;
      userInfo['dob'] = this.f.dob.value;

      this.authService.doRegister(email, password, userInfo);
      this.toastr.success("Welcome to Rosa Carter", "Notification", {
        timeOut: 1200
      })
      localStorage.clear();
      this.router.navigate(['/login']);

    }

  }

  startImageupload(file) {

    const path = `public/images/profile_photos/${Date.now()}_${file.name}`;
    console.log("the name is" + file.name)

    const ref = this.storage.ref(path);

    this.task = this.storage.upload(path, file);

    this.snapshot = this.task.snapshotChanges().pipe(
      tap(console.log),
      finalize(async () => {
        this.downloadURL.push(await ref.getDownloadURL().toPromise());
        console.log(this.downloadURL);
        localStorage.setItem('imgURL', JSON.stringify(this.downloadURL));

        this.db.collection('files').add({ downloadURL: this.downloadURL, path });

      }),
    );
  }

}
