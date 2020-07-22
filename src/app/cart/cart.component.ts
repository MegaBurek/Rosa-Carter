import {Component, OnInit} from '@angular/core';
import {Select, Store} from '@ngxs/store';
import {ToastrService} from 'ngx-toastr';
import {ShoppingCartService} from '../services/shoppingCart/shopping-cart.service';
import {ShoppingCartState} from '../store/shoppingCart/shoppingCart.state';
import {Observable} from 'rxjs';
import {ShoppingCartItem} from '../model/shopping-cart-item';
import {EmptyShoppingCart, RemoveFromShoppingCart, SetSelectedShoppingCartItem} from '../store/shoppingCart/shoppingCart.actions';
import {fadeInAnimation} from '../_animations';
import {ModalService} from '../_modal';
import {Order} from '../model/order.model';
import {OrdersService} from '../services/orders/orders.service';
import {AuthService} from '../services/auth/auth.service';
import {CreateOrder} from '../store/orders/orders.actions';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  animations: [fadeInAnimation],
  host: {'[@fadeInAnimation]': ''}
})
export class CartComponent implements OnInit {

  @Select(ShoppingCartState.getShoppingCart) shoppingItems: Observable<ShoppingCartItem[]>;

  shoppingCartIndex;
  shoppingCartItems: ShoppingCartItem[];
  public shoppingCartItem;

  constructor(
    private store: Store,
    private toastr: ToastrService,
    private shoppingCartService: ShoppingCartService,
    private modalService: ModalService,
    private ordersService: OrdersService,
    private authService: AuthService
  ) {
  }

  ngOnInit(): void {
  }

  removeItem(id) {
    this.store.dispatch(new RemoveFromShoppingCart(id));
    this.toastr.success('Removed from cart', 'Notification', {
      timeOut: 1500
    });
  }

  openEditModal(id: string, shoppingCartItem, shoppingCartIndex) {
    this.shoppingCartIndex = shoppingCartIndex;
    this.shoppingCartItem = shoppingCartItem;
    this.modalService.open(id);
  }

  openCheckoutModal(id: string) {
    this.modalService.open(id);
  }

  updateEdit(shoppingCartItem) {
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  calculateCartTotal() {
    let totalValue = 0;
    this.shoppingItems.subscribe((values) => {
      this.shoppingCartItems = values;
    }, error => {
      console.error(error);
    });
    for (const item of this.shoppingCartItems) {
      totalValue += parseInt(item.product.price, 10);
    }
    return totalValue;
  }

  confirmOrder() {
    const order: Order = {
      uid: null,
      shoppingCartItems: this.shoppingCartItems,
      dateOrdered: new Date(),
      owner: this.authService.getLoggedInID(),
      ownerName: name,
      status: 'Ordered'
    };
    this.store.select(state => state.user.loggedInUser).subscribe((user) => {
      order.ownerName = user.name;
    });
    this.store.dispatch(new CreateOrder(order));
  }


}
