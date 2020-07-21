import {Component, OnInit} from '@angular/core';
import {Select, Store} from '@ngxs/store';
import {ToastrService} from 'ngx-toastr';
import {ShoppingCartService} from '../services/shoppingCart/shopping-cart.service';
import {ShoppingCartState} from '../store/shoppingCart/shoppingCart.state';
import {Observable} from 'rxjs';
import {ShoppingCartItem} from '../model/shopping-cart-item';
import {RemoveFromShoppingCart, SetSelectedShoppingCartItem} from '../store/shoppingCart/shoppingCart.actions';
import {fadeInAnimation} from '../_animations';
import {ModalService} from '../_modal';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  animations: [fadeInAnimation],
  host: {'[@fadeInAnimation]': ''}
})
export class CartComponent implements OnInit {

  @Select(ShoppingCartState.getShoppingCart) shoppingItems: Observable<ShoppingCartItem[]>;
  @Select(ShoppingCartState.getSelectedShoppingItem) shoppingCartItem: Observable<ShoppingCartItem>;

  shoppingCartIndex;

  constructor(
    private store: Store,
    private toastr: ToastrService,
    private shoppingCartService: ShoppingCartService,
    private modalService: ModalService
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
    this.store.dispatch(new SetSelectedShoppingCartItem(shoppingCartItem));
    this.modalService.open(id);
  }

  updateEdit(shoppingCartItem) {
  }

  closeEditModal(id: string) {
    this.modalService.close(id);
  }


}
