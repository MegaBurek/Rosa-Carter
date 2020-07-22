import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from 'src/app/services/auth/auth.service';
import {ToastrService} from 'ngx-toastr';
import {UserService} from 'src/app/services/users/user.service';
import {fadeInAnimation} from '../../_animations/fade-in.animation';
import {Store} from '@ngxs/store';
import {GetLatestProducts} from '../../store/products/products.actions';
import {AngularFirestore} from '@angular/fire/firestore';
import {User} from '../../model/user.model';
import {SetLoggedInUser} from '../../store/user/user.actions';

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
    private toastr: ToastrService,
    private db: AngularFirestore,
    private store: Store
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
        this.setLoggedInUser(this.authService.getLoggedInID());
        this.roleCheck();
      }, err => {
        console.log(err);
        this.errorMessage = err.message;
        this.toastr.error(this.errorMessage, 'Notification', {
          timeOut: 1700
        });
      });
  }

  setLoggedInUser(id) {
    const user: User = new User();
    this.db.collection('users').doc(id).snapshotChanges().subscribe(actionArray => {
      user.uid = actionArray.payload.get('uid');
      user.email = actionArray.payload.get('email');
      user.displayName = actionArray.payload.get('displayName');
      user.imageUrl = actionArray.payload.get('imageUrl');
      user.orders = actionArray.payload.get('orders');
      user.emailVerified = actionArray.payload.get('emailVerified');
      user.role = actionArray.payload.get('role');
      user.name = actionArray.payload.get('name');
      user.surname = actionArray.payload.get('surname');
    });
    this.store.dispatch(new SetLoggedInUser(user));
  }

  roleCheck() {
    this.userService.getUserById(this.authService.getLoggedInID()).subscribe(actionArray => {
      this.role = actionArray.payload.get('role');
      if (this.role === 'admin') {
        this.router.navigate(['/dashboard']);
      } else {
        this.router.navigate(['/home']);
      }
    });
  }
}
