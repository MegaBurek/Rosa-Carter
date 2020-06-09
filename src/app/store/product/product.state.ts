import {Product} from 'src/app/model/product';
import {State, Selector, Action, StateContext} from '@ngxs/store';
import {tap} from 'rxjs/operators';
import {ProductsService} from "../../services/products/products.service";
import {GetAllBras, GetAllSets, GetAllUndies} from "./product.actions";
import {Injectable} from "@angular/core";

export class ProductStateModel {
  shopping_cart: Product[];
  bras: Product[];
  undies: Product[];
  sets: Product[];
  selectedProduct: Product;

}

@State<ProductStateModel>({
  name: 'products',
  defaults: {
    shopping_cart: [],
    bras: [],
    undies: [],
    sets: [],
    selectedProduct: {
      uid: null, name: null, type: null, imageUrl: null, desc: null, price:null
    }
  }
})
@Injectable()
export class ProductState {

  constructor(
    private productService: ProductsService
  ){}

  @Selector()
  static getShoppingCart(state: ProductStateModel){
      return state.shopping_cart;
  }

  @Selector()
  static getSelectedProduct(state: ProductStateModel){
    return state.selectedProduct;
  }

  @Selector()
  static getAllBras(state: ProductStateModel){
    return state.bras;
  }

  @Selector()
  static getAllUndies(state: ProductStateModel){
    return state.undies;
  }

  @Selector()
  static getAllSets(state: ProductStateModel){
    return state.sets;
  }

  @Action(GetAllBras)
  getAllBras({patchState}: StateContext<ProductStateModel>) {
    return this.productService.getAllBras().pipe(tap(bras => {
      patchState({
        bras: bras
      })
    }))
  }

  @Action(GetAllUndies)
  getAllUndies({patchState}: StateContext<ProductStateModel>) {
    return this.productService.getAllUndies().pipe(tap(undies => {
      patchState({
        undies: undies
      })
    }))
  }

  @Action(GetAllSets)
  getAllSets({patchState}: StateContext<ProductStateModel>) {
    return this.productService.getAllSets().pipe(tap(sets => {
      patchState({
        sets: sets
      })
    }))
  }


}
