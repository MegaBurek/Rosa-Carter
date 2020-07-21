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

  constructor(
    private store: Store,
    private toastr: ToastrService
  ) {
  }

  ngOnInit(): void {
  }

}
