import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from 'src/app/services/auth/auth.service';
import {ToastrService} from 'ngx-toastr';
import {UserService} from 'src/app/services/users/user.service';
import {fadeInAnimation} from '../../_animations/fade-in.animation';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [fadeInAnimation],
  host: {'[@fadeInAnimation]': ''}
})
export class LoginComponent implements OnInit {

  errorMessage: string = '';
  loginForm: FormGroup;
  role: string = '';


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private userService: UserService,
    private toastr: ToastrService
  ) {
    this.createLoginForm();
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: [''],
      password: ['']
    });
  }

  ngOnInit(): void {
  }

  get f() {
    return this.loginForm.controls;
  }

  tryLogin(value) {
    this.authService.doLogin(value)
      .then(res => {
        this.toastr.success('You have succesfully logged in', 'Notification', {
          timeOut: 1200
        });
        localStorage.setItem('uid', this.authService.getLoggedInID());
        this.roleCheck();
      }, err => {
        console.log(err);
        this.errorMessage = err.message;
        this.toastr.error(this.errorMessage, 'Notification', {
          timeOut: 1700
        });
      });
  }

  roleCheck() {
    this.userService.getUser(this.authService.getLoggedInID()).subscribe(actionArray => {
      this.role = actionArray.payload.get('role');
      if (this.role === 'admin') {
        this.router.navigate(['/dashboard']);
      } else {
        this.router.navigate(['/home']);
      }
    });
  }
}
