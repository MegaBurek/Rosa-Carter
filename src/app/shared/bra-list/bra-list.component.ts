import { Component, OnInit } from '@angular/core';
import {ProductState} from "../../store/product/product.state";
import {Select} from "@ngxs/store";
import {Observable} from "rxjs/index";
import {Product} from "../../model/product";

@Component({
  selector: 'app-bra-list',
  templateUrl: './bra-list.component.html',
  styleUrls: ['./bra-list.component.scss']
})
export class BraListComponent implements OnInit {

  @Select(ProductState.getAllBras) currentBras: Observable<Product[]>;

  constructor() { }

  ngOnInit(): void {
  }

}
