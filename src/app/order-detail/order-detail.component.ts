import {Component, OnInit} from '@angular/core';
import {OrdersService} from '../services/orders/orders.service';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../services/users/user.service';
import {User} from '../model/user.model';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {

  order: any;

  constructor(
    private ordersService: OrdersService,
    private activatedRoute: ActivatedRoute
  ) {
    const id = this.activatedRoute.snapshot.params.uid;
    this.ordersService.getOrderById(id).subscribe((docRef) => {
      this.order = docRef.data();
    });
  }

  ngOnInit(): void {
  }

}
