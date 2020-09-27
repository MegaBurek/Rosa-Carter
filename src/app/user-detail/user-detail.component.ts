import { Component, OnInit } from '@angular/core';
import { User } from '../model/user.model';
import { UserService } from '../services/users/user.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { fadeInAnimation } from '../_animations/fade-in.animation';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { OrdersState } from '../store/orders/orders.state';
import { Order } from '../model/order.model';
import { Observable } from 'rxjs';
import { Select } from '@ngxs/store';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
  animations: [fadeInAnimation],
  host: {'[@fadeInAnimation]': ''}
})
export class UserDetailComponent implements OnInit {

  @Select(OrdersState.getMyOrders) myOrders: Observable<Order[]>;

  user: User = new User();
  edit: false;
  editForm: FormGroup;

  constructor(
    private userService: UserService,
    private storage: AngularFireStorage,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute
  ) {
    this.createEditForm();

  }

  createEditForm() {
    this.editForm = this.formBuilder.group({
      displayName: ['', Validators.required],
      name: ['', Validators.required],
      surname: ['', Validators.required],
      dob: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.userService.getUserById(this.activatedRoute.snapshot.params.userId).subscribe(actionArray => {
      this.user.imageUrl = actionArray.payload.get('imageUrl');
      this.user.displayName = actionArray.payload.get('displayName');
      this.user.email = actionArray.payload.get('email');
      this.user.dob = actionArray.payload.get('dob');
      this.user.emailVerified = actionArray.payload.get('emailVerified');
      this.user.name = actionArray.payload.get('name');
      this.user.surname = actionArray.payload.get('surname');
      this.user.role = actionArray.payload.get('role');
    });
  }


}
