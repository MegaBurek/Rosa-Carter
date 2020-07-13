import { Component, OnInit } from '@angular/core';
import {fadeInAnimation} from "../_animations/fade-in.animation";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: [fadeInAnimation],
  host: {'[@fadeInAnimation]':''}
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
