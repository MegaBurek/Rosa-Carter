import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/index';
import {Product} from '../../model/product';
import {fadeInAnimation} from '../../_animations/fade-in.animation';
import {Select, Store} from '@ngxs/store';
import {AddToShoppingCart} from '../../store/shoppingCart/shoppingCart.actions';
import {ProductsState} from '../../store/products/products.state';
import {ShoppingCartState} from '../../store/shoppingCart/shoppingCart.state';
import {ToastrService} from 'ngx-toastr';
import {ShoppingCartItem} from '../../model/shopping-cart-item';

@Component({
  selector: 'app-bra-list',
  templateUrl: './bra-list.component.html',
  styleUrls: ['./bra-list.component.scss'],
  animations: [fadeInAnimation],
  host: {'[@fadeInAnimation]': ''}
})
export class BraListComponent implements OnInit {

  @Select(ProductsState.getBras) products: Observable<Product[]>;
  @Select(ShoppingCartState.getShoppingCartSize) itemsInCart: Observable<number>;
  shoppingCartItem: ShoppingCartItem = {
    id: 0,
    product: null,
    quantity: 1
  };
  cartSize = 0;

  constructor(
    private store: Store,
    private toastr: ToastrService
  ) {
    this.itemsInCart.subscribe(value => {
      this.cartSize = value;
    });
  }

  ngOnInit(): void {
  }

  addToCart(product) {
    this.shoppingCartItem.id = this.cartSize;
    this.shoppingCartItem.product = product;
    this.store.dispatch(new AddToShoppingCart(this.shoppingCartItem));
    this.toastr.success('You have added to your cart', 'Notificaiton');
  }

}
