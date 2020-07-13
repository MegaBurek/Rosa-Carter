import { Component, OnInit } from '@angular/core';
import {fadeInAnimation} from "../../_animations/fade-in.animation";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
  animations: [fadeInAnimation],
  host: {'[@fadeInAnimation]':''}
})
export class ProductDetailComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
