import { Component, OnInit, ViewChild } from '@angular/core';
import { NgImageSliderComponent } from 'ng-image-slider'

@Component({
  selector: 'app-home-shop',
  templateUrl: './home-shop.component.html',
  styleUrls: ['./home-shop.component.scss']
})
export class HomeShopComponent implements OnInit {

  @ViewChild('nav', { static: false }) slider: NgImageSliderComponent
  showSlider = true;

  sliderWidth: Number = 940;
  sliderImageSize: Object = { width: '225px', height: '290px' }
  sliderArrowShow: Boolean = false;
  sliderInfinite: Boolean = true;
  sliderImagePopup: Boolean = true;
  sliderSlideImage: Number = 1;
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
      },{
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


