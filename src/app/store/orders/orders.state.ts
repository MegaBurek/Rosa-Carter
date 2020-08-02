import {Order} from '../../model/order.model';
import {Action, Selector, State, StateContext, Store} from '@ngxs/store';
import {Injectable} from '@angular/core';
import {OrdersService} from '../../services/orders/orders.service';
import {CreateOrder, GetMyOrders} from './orders.actions';
import {tap} from 'rxjs/operators';
import {EmptyShoppingCart} from '../shoppingCart/shoppingCart.actions';
import {ModalService} from '../../_modal';
import {ToastrService} from 'ngx-toastr';

export class OrderStateModel {
  myOrders: Order[];
}

@State<OrderStateModel>({
  name: 'orders',
  defaults: {
    myOrders: []
  }
})
@Injectable()
export class OrdersState {

  constructor(
    private os: OrdersService,
    private modalService: ModalService,
    private toastr: ToastrService,
    private store: Store
  ) {
  }

  @Selector()
  static getMyOrders(state: OrderStateModel) {
    return state.myOrders;
  }

  @Action(GetMyOrders)
  getMyOrders({patchState}: StateContext<OrderStateModel>, {id}: GetMyOrders) {
    return this.os.getMyOrders(id).pipe(tap((orders) => {
      patchState({
        myOrders: orders
      });
    }));
  }

  @Action(CreateOrder)
  createOrder({getState, patchState}: StateContext<OrderStateModel>, {order}: CreateOrder) {
    const state = getState();
    this.os.createOrder(order).then((value) => {
      value.set({uid: value.id}, {merge: true}).then(() => {
        order.uid = value.id;
        patchState({
          myOrders: [...state.myOrders, order]
        });
        this.toastr.success('You have successfully placed your order', 'Notification');
        this.store.dispatch(new EmptyShoppingCart());
        this.modalService.close('checkout-modal');
      });
    })
      .catch((error) => {
        console.error(error);
      });
  }

}
