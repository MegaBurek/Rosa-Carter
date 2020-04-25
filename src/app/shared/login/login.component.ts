import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  errorMessage: string = '';
  loginForm: FormGroup;


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService
  ) {
    this.createLoginForm();
   }

  createLoginForm(){
    this.loginForm = this.formBuilder.group({
      email: [''],
      password: ['']
    });
  }

  ngOnInit(): void {
  }

  get f() {return this.loginForm.controls}

  tryLogin(value){
    this.authService.doLogin(value)
    .then(res => {
      this.toastr.success("You have succesfully logged in","Notification",{
        timeOut: 1200
      })
      localStorage.setItem('uid',this.authService.getLoggedInID())
      this.router.navigate(['/userDetail']);
    }, err => {
      console.log(err);
      this.errorMessage = err.message;
      this.toastr.error(this.errorMessage,"Notification",{
        timeOut: 1700
      })
    })
  }
}
