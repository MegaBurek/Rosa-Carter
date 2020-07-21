import {Selector, State, StateContext} from '@ngxs/store';
import {Receiver} from '@ngxs-labs/emitter';

@State<number>({
  name: 'cartSize',
  defaults: 0
})
export class CartSizeState {

  @Selector()
  static getShoppingCartSize(state: CartSizeState) {
    return state;
  }

  @Receiver()
  public static increment({setState, getState}: StateContext<number>) {
    setState(getState() + 1);
  }

  @Receiver()
  public static decrement({setState, getState}: StateContext<number>) {
    setState(getState() - 1);
  }
}
