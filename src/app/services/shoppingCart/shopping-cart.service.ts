import {Injectable} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {Select, Store} from '@ngxs/store';
import {ShoppingCartItem} from '../../model/shopping-cart-item';
import {AddToShoppingCart, RemoveFromShoppingCart} from '../../store/shoppingCart/shoppingCart.actions';
import {EmitterService} from '@ngxs-labs/emitter';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  cartSize: number;

  constructor(
    private toastr: ToastrService,
    private store: Store,
    private emitter: EmitterService
  ) {
  }

  addToCart(product) {
    const shoppingCartItem: ShoppingCartItem = {
      product: null,
      quantity: 1
    };
    shoppingCartItem.product = product;
    this.store.dispatch(new AddToShoppingCart(shoppingCartItem));
    this.toastr.success('You have added to your cart', 'Notification');
  }

  removeFromCart(productIndex) {
    this.store.dispatch(new RemoveFromShoppingCart(productIndex));
    this.toastr.success('You have removed from your cart', 'Notification');
  }

  editCartItem(shoppingCartItem) {

  }


}
