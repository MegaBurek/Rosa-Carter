import { ShoppingItem } from './shopping_item';

export default class ShopCartState {
    cart: Array<ShoppingItem>;
}

export const initializeState = (): ShopCartState => {
    return { cart: Array<ShoppingItem>()};
};