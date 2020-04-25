import { Component, OnInit, Input } from '@angular/core';
import { User } from '../model/user.model';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/users/user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {

  @Input() user:User;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) { }

  ngOnInit(): void {
  }

  getUser():void{
    const id = +this.route.snapshot.paramMap.get('id');
    this.userService.getUser(id.toString())
    .subscribe(user => this.user = user);
  }

}
