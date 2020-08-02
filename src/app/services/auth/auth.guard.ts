import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from "@angular/router";
import { AngularFireAuth } from '@angular/fire/auth';
import { UserService } from '../users/user.service';


@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    public afAuth: AngularFireAuth,
    public userService: UserService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const authorized = localStorage.getItem('uid');
    if (authorized) {
      return true;
    }
    else{
      return false;
    }
  }

}
