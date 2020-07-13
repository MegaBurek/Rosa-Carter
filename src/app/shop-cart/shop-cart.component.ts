import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {ShoppingCartState} from '../store/shoppingCart/shoppingCart.state';
import {Select, Store} from '@ngxs/store';
import {ShoppingCartItem} from '../model/shopping-cart-item';
import {RemoveFromShoppingCart} from '../store/shoppingCart/shoppingCart.actions';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-shop-cart',
  templateUrl: './shop-cart.component.html',
  styleUrls: ['./shop-cart.component.scss']
})
export class ShopCartComponent implements OnInit {

  @Select(ShoppingCartState.getShoppingCart) shoppingItems: Observable<ShoppingCartItem[]>;
  @Select(ShoppingCartState.getSelectedShoppingItem) selectedShoppingCartItem: Observable<ShoppingCartItem>;

  constructor(
    private store: Store,
    private toastr: ToastrService
  ) {
  }

  ngOnInit() {
  }

  removeItem(id) {
    this.store.dispatch(new RemoveFromShoppingCart(id));
    this.toastr.success('Removed from cart', 'Notification', {
      timeOut: 1500
    });
  }


}
