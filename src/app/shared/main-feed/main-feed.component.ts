import { Component, OnInit } from '@angular/core';
import {fadeInAnimation} from "../../_animations/fade-in.animation";

@Component({
  selector: 'app-main-feed',
  templateUrl: './main-feed.component.html',
  styleUrls: ['./main-feed.component.scss'],
  animations: [fadeInAnimation],
  host: {'[@fadeInAnimation]':''}
})
export class MainFeedComponent implements OnInit {

  constructor(
  ) { }

  ngOnInit(): void {
  }

}
