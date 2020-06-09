import {Component, OnInit, OnDestroy} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from 'src/app/services/auth/auth.service';
import {ToastrService} from 'ngx-toastr';
import {ImageUtilService} from 'src/app/services/util/image-util.service';

@Component({
  selector: 'app-account-completion',
  templateUrl: './account-completion.component.html',
  styleUrls: ['./account-completion.component.scss']
})
export class AccountCompletionComponent implements OnInit, OnDestroy {

  accountCompletionForm: FormGroup;
  check = false;
  selectedFile: File;

  constructor(
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private imgSerivce: ImageUtilService
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

  ngOnDestroy(): void {
    localStorage.clear();
  }

  ngOnInit(): void {
  }

  onFileSelected(event) {
    this.selectedFile = <File> event.target.files[0];
    if (this.selectedFile != null) {
      this.check = true;
    }
  }

  get f() {
    return this.accountCompletionForm.controls;
  }

  tryRegister() {
    const inputNode: any = document.querySelector('#file');
    if (inputNode.files.lenth == 0) {
      this.toastr.error('Please upload a profile photo', 'Notification', {
        timeOut: 1700
      });
    } else if (this.f.displayName.value == '') {
      this.toastr.error('Please enter a display name', 'Notification', {
        timeOut: 1700
      });
    } else if (this.f.name.value == '') {
      this.toastr.error('Please enter your name', 'Notification', {
        timeOut: 1700
      });
    } else if (this.f.surname.value == '') {
      this.toastr.error('Please enter your surname', 'Notification', {
        timeOut: 1700
      });
    } else if (this.f.dob.value == '') {
      this.toastr.error('Please enter your date of birth', 'Notification', {
        timeOut: 1700
      });
    } else {
      // let userInfo = {};
      // let file: File = inputNode.files[0];
      // let pathToDownload: string = this.imgSerivce.startImageupload(file);
      //
      //
      // let email = localStorage.getItem('email');
      // let password = localStorage.getItem('password');
      //
      // userInfo['displayName'] = this.f.displayName.value;
      // userInfo['name'] = this.f.name.value;
      // userInfo['surname'] = this.f.surname.value;
      // userInfo['dob'] = this.f.dob.value;
      // userInfo['role'] = 'user';
      // userInfo['imageUrl'] = pathToDownload;
      //
      // this.authService.doRegister(email, password, userInfo);
      // this.authService.doLogout();
      // this.toastr.success('Welcome to Rosa Carter', 'Notification', {
      //   timeOut: 1700
      // });
      // this.router.navigate(['/login']);

    }

  }

}
