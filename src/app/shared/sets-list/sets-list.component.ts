import {Component, OnInit} from '@angular/core';
import {fadeInAnimation} from '../../_animations/fade-in.animation';
import {Observable} from 'rxjs/index';
import {Product} from '../../model/product';
import {Select} from '@ngxs/store';
import {ProductsState} from '../../store/products/products.state';

@Component({
  selector: 'app-sets-list',
  templateUrl: './sets-list.component.html',
  styleUrls: ['./sets-list.component.scss'],
  animations: [fadeInAnimation],
  host: {'[@fadeInAnimation]': ''}
})
export class SetsListComponent implements OnInit {

  @Select(ProductsState.getSets) products: Observable<Product[]>;

  constructor() {
  }

  ngOnInit(): void {
  }

}
