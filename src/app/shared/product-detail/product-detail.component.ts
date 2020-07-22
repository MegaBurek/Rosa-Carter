import {Component, OnInit, ViewChild} from '@angular/core';
import {fadeInAnimation} from '../../_animations/fade-in.animation';
import {ProductsService} from '../../services/products/products.service';
import {ActivatedRoute} from '@angular/router';
import {NgImageSliderComponent} from 'ng-image-slider';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
  animations: [fadeInAnimation],
  host: {'[@fadeInAnimation]': ''}
})
export class ProductDetailComponent implements OnInit {

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

  product: any;

  constructor(
    private productsService: ProductsService,
    private activatedRoute: ActivatedRoute
  ) {
    const id = this.activatedRoute.snapshot.params.uid;
    this.productsService.getProductById(id).subscribe((docRef) => {
      this.product = docRef.data();
      this.imageObject = [
        {
          image: this.product.imageUrl,
          thumbImage: this.product.imageUrl
        }
      ];
    });
  }

  ngOnInit(): void {
  }


  nextSlide() {
    this.slider.next();
  }

  prevSlide() {
    this.slider.prev();
  }

}
