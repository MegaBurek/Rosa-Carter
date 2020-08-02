import { Component, OnInit } from '@angular/core';
import {fadeInAnimation} from "../../_animations/fade-in.animation";

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss'],
  animations: [fadeInAnimation],
  host: {'[@fadeInAnimation]':''}
})
export class OrderListComponent implements OnInit {


  constructor() { }

  ngOnInit(): void {
  }

}
