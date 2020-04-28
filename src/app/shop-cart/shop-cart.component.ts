import { Component, OnInit } from '@angular/core';
import { PRODUCTS } from "./mock-products";
import { ShopCartService } from "../services/shop-cart/shop-cart.service";
import { Product } from '../model/product';

@Component({
  selector: 'app-shop-cart',
  templateUrl: './shop-cart.component.html',
  styleUrls: ['./shop-cart.component.scss']
})
export class ShopCartComponent implements OnInit {

  products: Product[] = [];
  total:number = 1200;

  constructor(
    private shopCartService: ShopCartService) { }

  ngOnInit(): void {
  }

  removeFromCart(product){
    this.shopCartService.removeFromCart(product);
    this.getCart(); 
  }

  getCart(){
    this.products = this.shopCartService.getItems();
  }

}
