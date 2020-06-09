import {Component, OnInit, OnDestroy} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from 'src/app/services/auth/auth.service';
import {ToastrService} from 'ngx-toastr';
import {AngularFireAuth} from '@angular/fire/auth';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  errorMessage: string = '';
  registerForm: FormGroup;
  password: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private fs: AngularFireAuth
  ) {
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      repassword: ['', Validators.required],
    });
  }

  ngOnInit(): void {
  }

  get f() {
    return this.registerForm.controls;
  }

  toCompletion() {
    this.password = this.f.password.value;
    if (this.f.email.value === '') {
      this.toastr.error('Please enter password', 'Notification', {
        timeOut: 1700
      });
    } else if (!this.validateEmail(this.f.email.value)) {
      this.toastr.error('Your email is invalid', 'Notification', {
        timeOut: 1700
      });
    } else if (this.f.password.value === '') {
      this.toastr.error('Please enter password', 'Notification', {
        timeOut: 1700
      });
    } else if (this.f.repassword.value === '') {
      this.toastr.error('Please re-enter your password', 'Notification', {
        timeOut: 1700
      });
    } else if (this.f.password.value !== this.f.repassword.value) {
      this.toastr.error('Your passwords do not match', 'Notification', {
        timeOut: 1700
      });
    } else if (this.password.length < 6) {
      this.toastr.error('Your password must be more than 6 characters', 'Notification', {
        timeOut: 1700
      });
    } else {
      localStorage.setItem('email', (this.f.email.value));
      localStorage.setItem('password', (this.f.password.value));
      this.router.navigate(['/accountCompletion']);
    }
  }


  validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

}
