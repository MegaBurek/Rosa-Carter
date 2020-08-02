import {Component, OnInit} from '@angular/core';
import {OrdersService} from '../services/orders/orders.service';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../services/users/user.service';
import {User} from '../model/user.model';
import {ModalService} from '../_modal';
import {AuthService} from '../services/auth/auth.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {

  order: any;
  shoppingItems: [];
  shoppingItem: any;

  constructor(
    private ordersService: OrdersService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private ms: ModalService,
    private authService: AuthService
  ) {
    const id = this.activatedRoute.snapshot.params.uid;
    this.ordersService.getOrderById(id).subscribe((docRef) => {
      this.order = docRef.data();
    });
  }

  ngOnInit(): void {
    this.isAdminLogged();
  }

  toUserProfile(id) {
    this.router.navigate([`/user` + `/${id}`]);
  }

  openStatusModal(id) {
    this.ms.open(id);
  }

  closeStatusModal(id) {
    this.ms.close(id);
  }

  openProductModal(id, product) {
    this.shoppingItem = product;
    this.ms.open(id);
  }

  closeProductModal(id) {
    this.ms.open(id);
  }

  isAdminLogged() {
    return this.authService.isAdminLogged();
  }

  confirmStatus() {

  }

  toProduct(uid) {
    this.router.navigate([`/product` + `/${uid}`]);
  }

}
