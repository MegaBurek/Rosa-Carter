import { Component, OnInit, Input } from '@angular/core';
import { User } from '../model/user.model';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/users/user.service';
import { AngularFireStorage, AngularFireStorageReference } from '@angular/fire/storage';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {

  user: User = new User;
  imageUrl: string = '';


  constructor(
    private userService: UserService,
    private storage: AngularFireStorage
  ) { }

  ngOnInit(){
    this.userService.getUser(localStorage.getItem('uid')).subscribe(actionArray => {
      this.user.displayName = actionArray.payload.get('displayName');
      this.user.email = actionArray.payload.get('email');
      this.user.dob = actionArray.payload.get('dob');
      this.user.emailVerified = actionArray.payload.get('emailVerified');
      this.user.name = actionArray.payload.get('name');
      this.user.surname = actionArray.payload.get('surname');
      this.user.role = actionArray.payload.get('role');

      this.loadImage(actionArray.payload.get('imageUrl'))
    });
    
  }

  loadImage(imageUrl){
    let storageRef = this.storage.ref(imageUrl);
    storageRef.getDownloadURL().subscribe(url =>{
      url = this.imageUrl = url;
    })
  }

}
