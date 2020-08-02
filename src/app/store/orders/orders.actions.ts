import {Order} from '../../model/order.model';

export class GetMyOrders {
  static readonly type = '[Orders API] My Orders';

  constructor(public id: string) {
  }
}

export class CreateOrder {
  static readonly type = '[Order API] Create Order';

  constructor(public order: Order) {
  }
}
