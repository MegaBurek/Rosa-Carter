import {Injectable} from '@angular/core';
import {Action, Selector, State, StateContext} from '@ngxs/store';
import {Product} from '../../model/product';
import {ProductsService} from '../../services/products/products.service';
import {GetAllBras, GetAllSets, GetAllUndies, GetLatestProducts} from './products.actions';
import {tap} from 'rxjs/internal/operators';

export class ProductStateModel {
  bras: Product[];
  sets: Product[];
  undies: Product[];
  selectedProduct: Product;
  latestProducts: Product[];
}

@State<ProductStateModel>({
  name: 'products',
  defaults: {
    bras: [],
    sets: [],
    undies: [],
    selectedProduct: {
      uid: null, name: null, color: null, desc: null, price: null, type: null, dateCreated: null, imageUrl: null
    },
    latestProducts: []
  }
})
@Injectable()
export class ProductsState {

  constructor(
    private ps: ProductsService
  ) {
  }

  @Selector()
  static getSelectedProduct(state: ProductStateModel) {
    return state.selectedProduct;
  }

  @Selector()
  static getLatestProducts(state: ProductStateModel) {
    return state.latestProducts;
  }

  @Selector()
  static getBras(state: ProductStateModel) {
    return state.bras;
  }

  @Selector()
  static getSets(state: ProductStateModel) {
    return state.sets;
  }

  @Selector()
  static getUndies(state: ProductStateModel) {
    return state.undies;
  }

  @Action(GetAllBras)
  getAllBras({patchState}: StateContext<ProductStateModel>) {
    return this.ps.getAllBras().pipe(tap((latestBras) => {
      console.log(latestBras);
      patchState({
        bras: latestBras
      });
    }));
  }

  @Action(GetAllSets)
  getAllSets({patchState}: StateContext<ProductStateModel>) {
    return this.ps.getAllSets().pipe(tap((latestSets) => {
      patchState({
        sets: latestSets
      });
    }));
  }

  @Action(GetAllUndies)
  getAllUndies({patchState}: StateContext<ProductStateModel>) {
    return this.ps.getAllUndies().pipe(tap((latestUndies) => {
      patchState({
        undies: latestUndies
      });
    }));
  }

  @Action(GetLatestProducts)
  getLatestProducts({patchState}: StateContext<ProductStateModel>) {
    return this.ps.getNewArrivals().pipe(tap((products) => {
      patchState({
        latestProducts: products
      });
    }));
  }

}
