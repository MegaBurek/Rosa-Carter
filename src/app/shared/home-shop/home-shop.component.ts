import {Component, OnInit, ViewChild} from '@angular/core';
import {NgImageSliderComponent} from 'ng-image-slider';
import {fadeInAnimation} from '../../_animations/fade-in.animation';

@Component({
  selector: 'app-home-shop',
  templateUrl: './home-shop.component.html',
  styleUrls: ['./home-shop.component.scss'],
  animations: [fadeInAnimation],
  host: {'[@fadeInAnimation]': ''}
})
export class HomeShopComponent implements OnInit {

  @ViewChild('nav', {static: false}) slider: NgImageSliderComponent;
  showSlider = true;

  sliderWidth = 940;
  sliderImageSize = {width: '225px', height: '290px'};
  sliderArrowShow = false;
  sliderInfinite = true;
  sliderImagePopup = true;
  sliderSlideImage = 1;
  sliderAnimationSpeed: any = 1;

  imageObject: Array<object> = [];

  constructor() {
    this.setImageObject();
  }

  ngOnInit(): void {
  }

  setImageObject() {
    this.imageObject = [
      {
        image: '../../../assets/content/12.jpg',
        thumbImage: '../../../assets/content/12.jpg'
      },
      {
        image: '../../../assets/content/5.jpg',
        thumbImage: '../../../assets/content/5.jpg'
      }, {
        image: '../../../assets/content/13.jpg',
        thumbImage: '../../../assets/content/13.jpg'
      }, {
        image: '../../../assets/content/15.jpg',
        thumbImage: '../../../assets/content/15.jpg'
      }];
  }

  nextSlide() {
    this.slider.next();
  }

  prevSlide() {
    this.slider.prev();
  }
}


