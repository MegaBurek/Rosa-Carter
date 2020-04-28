import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/model/product';


@Injectable({
  providedIn: 'root'
})
export class ShopCartService {

  toastr: ToastrService;
  
  items: Product[] = [];

  addToCart(product){
    this.items.push(product);
    this.toastr.success("You have added an item to your cart", "Notification", {
      timeOut: 1700
    })
    // localStorage.setItem("items", JSON.stringify(this.items));
  }

  removeFromCart(product){
    const index = this.items.indexOf(product);
    if (index > -1){
      this.items.splice(index, 1);
    }
  }

  getItems(){
    return this.items;
  }

  clearCart(){
    this.items = [];
    return this.items;
  }

  constructor() { }
}
