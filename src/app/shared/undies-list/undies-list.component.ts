import {Component, OnInit} from '@angular/core';
import {fadeInAnimation} from '../../_animations/fade-in.animation';
import {Product} from '../../model/product';
import {Observable} from 'rxjs/index';
import {Select} from '@ngxs/store';
import {ProductsState} from '../../store/products/products.state';
import {ShoppingCartService} from '../../services/shoppingCart/shopping-cart.service';

@Component({
  selector: 'app-undies-list',
  templateUrl: './undies-list.component.html',
  styleUrls: ['./undies-list.component.scss'],
  animations: [fadeInAnimation],
  host: {'[@fadeInAnimation]': ''}
})
export class UndiesListComponent implements OnInit {

  @Select(ProductsState.getUndies) products: Observable<Product[]>;

  constructor(
    private shoppingCartService: ShoppingCartService
  ) {
  }

  ngOnInit(): void {
  }

  addToCart(product) {
    this.shoppingCartService.addToCart(product);
  }

}
