import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent implements OnInit {

  constructor(
    private authService:AuthService,
    private router: Router,
    private toastr: ToastrService
  ) 
    {}

  ngOnInit(): void {
  }

  isLoggedIn(){
    let user = localStorage.getItem('uid');
    if (user != null){
      return true;
    }
    return false;
  }

  logout(){
    this.authService.doLogout();
    localStorage.removeItem('uid');
    this.toastr.success("Your have logged out", "Notification", {
      timeOut: 1700
    })
    this.router.navigate(['/login']);

  }

}
