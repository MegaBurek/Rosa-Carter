import {Component, OnInit} from '@angular/core';
import {AuthService} from 'src/app/services/auth/auth.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {fadeInAnimation} from '../../_animations/fade-in.animation';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss'],
  animations: [fadeInAnimation],
  host: {'[@fadeInAnimation]': ''}
})
export class NavigationBarComponent implements OnInit {

  cart = [];

  constructor(
    public authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {
  }

  ngOnInit(): void {
  }

  loggedInUserID() {
    return this.authService.getLoggedInID();
  }

  isLoggedIn() {
    let user = localStorage.getItem('uid');
    if (user != null) {
      return true;
    }
    return false;
  }

  logout() {
    this.authService.doLogout();
    localStorage.removeItem('uid');
    localStorage.removeItem('@@STATE');
    this.toastr.success('Your have logged out', 'Notification', {
      timeOut: 1700
    });
    this.router.navigate(['/login']);

  }

}
