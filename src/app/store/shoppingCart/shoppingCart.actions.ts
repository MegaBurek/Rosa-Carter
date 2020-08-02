import {ShoppingCartItem} from '../../model/shopping-cart-item';

export class GetShoppingCart {
  static readonly type = '[ShopCart API] Get Shopping Cart';

  constructor() {
  }
}

export class EmptyShoppingCart {
  static readonly type = '[ShopCart API] Empty Shopping Cart';

  constructor() {
  }
}

export class SetSelectedShoppingCartItem {
  static readonly type = '[ShopCart API] Set Selected Shopping Cart Item';

  constructor(public shoppingCartItem: ShoppingCartItem) {
  }
}

export class GetSelectedShoppingCartItem {
  static readonly type = '[ShopCart API] Get Selected Shopping Cart Item';

  constructor() {
  }
}

export class EditSelectedShoppingCartItem {
  static readonly type = '[ShopCart API] Edit Selected Shopping Cart Item';

  constructor(public shoppingCartItem: ShoppingCartItem) {

  }
}

export class AddToShoppingCart {
  static readonly type = '[ShopCart API] Add Item to Shopping Cart';

  constructor(public shoppingCartItem: ShoppingCartItem) {
  }
}

export class RemoveFromShoppingCart {
  static readonly type = '[ShopCart API] Remove Item from Shopping Cart';

  constructor(public id: number) {
  }
}
