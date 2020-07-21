import {Component, OnInit} from '@angular/core';
import {fadeInAnimation} from '../../_animations/fade-in.animation';
import {ProductsState} from '../../store/products/products.state';
import {Product} from '../../model/product';
import {Observable} from 'rxjs';
import {Select} from '@ngxs/store';
import {ProductsService} from '../../services/products/products.service';
import {ShoppingCartState} from '../../store/shoppingCart/shoppingCart.state';
import {ShoppingCartService} from '../../services/shoppingCart/shopping-cart.service';

@Component({
  selector: 'app-main-feed',
  templateUrl: './main-feed.component.html',
  styleUrls: ['./main-feed.component.scss'],
  animations: [fadeInAnimation],
  host: {'[@fadeInAnimation]': ''}
})
export class MainFeedComponent implements OnInit {

  products: Observable<Product[]>;

  constructor(
    private ps: ProductsService,
    private shoppingCartService: ShoppingCartService
  ) {
    this.products = this.ps.getNewArrivals();
  }

  ngOnInit(): void {
  }

  addToCart(product) {
    this.shoppingCartService.addToCart(product);
  }
}
