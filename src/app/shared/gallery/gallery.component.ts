import { Component, OnInit } from '@angular/core';
import {fadeInAnimation} from "../../_animations/fade-in.animation";

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
  animations: [fadeInAnimation],
  host: {'[@fadeInAnimation]':''}
})
export class GalleryComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
