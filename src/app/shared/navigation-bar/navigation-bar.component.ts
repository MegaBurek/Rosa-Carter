import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent implements OnInit {

  constructor(
    private authService:AuthService
  ) 
    {}

  ngOnInit(): void {
  }

  isLoggedIn(){
    return this.authService.isLoggedIn();
  }

}
