import {Action, Selector, State, StateContext} from '@ngxs/store';
import {Injectable} from '@angular/core';
import {AddToShoppingCart, EditSelectedShoppingCartItem, RemoveFromShoppingCart, SetSelectedShoppingCartItem} from './shoppingCart.actions';
import {ShoppingCartService} from '../../services/shoppingCart/shopping-cart.service';
import {ShoppingCartItem} from '../../model/shopping-cart-item';

export class ShoppingCartStateModel {
  shoppingCart: ShoppingCartItem[];
  selectedShoppingItem: ShoppingCartItem;
}

@State<ShoppingCartStateModel>({
  name: 'shoppingCart',
  defaults: {
    shoppingCart: [],
    selectedShoppingItem: {
      product: null, quantity: null
    }
  }
})
@Injectable()
export class ShoppingCartState {

  constructor(
    private shoppingCartService: ShoppingCartService
  ) {
  }

  @Selector()
  static getShoppingCart(state: ShoppingCartStateModel) {
    return state.shoppingCart;
  }

  @Selector()
  static getCartSize(state: ShoppingCartStateModel) {
    return state.shoppingCart.length;
  }

  @Selector()
  static getSelectedShoppingItem(state: ShoppingCartStateModel) {
    return state.selectedShoppingItem;
  }

  @Action(SetSelectedShoppingCartItem)
  setSelectedShoppingCartItem({patchState}: StateContext<ShoppingCartStateModel>, {shoppingCartItem}: SetSelectedShoppingCartItem) {
    patchState({
      selectedShoppingItem: shoppingCartItem
    });
  }

  @Action(EditSelectedShoppingCartItem)
  editSelectedShoppingCartItem({getState, setState}: StateContext<ShoppingCartStateModel>, {shoppingCartItemIndex, shoppingCartItem}: EditSelectedShoppingCartItem) {
    const state = getState();
    const shoppingCart = state.shoppingCart;

  }

  @Action(AddToShoppingCart)
  addToShoppingCart({getState, patchState}: StateContext<ShoppingCartStateModel>, {shoppingCartItem}: AddToShoppingCart) {
    const state = getState();
    patchState({
      shoppingCart: [...state.shoppingCart, shoppingCartItem]
    });
  }

  @Action(RemoveFromShoppingCart)
  removeFromShoppingCart({getState, patchState}: StateContext<ShoppingCartStateModel>, {id}: RemoveFromShoppingCart) {
    const state = getState();
    patchState({
        shoppingCart: state.shoppingCart.filter((item, index) => index !== id)
      }
    );
  }


}
