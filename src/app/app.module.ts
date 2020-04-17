import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { environment } from '../environments/environment';
import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { NgImageSliderModule } from 'ng-image-slider';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationBarComponent } from './shared/navigation-bar/navigation-bar.component';
import { MainFeedComponent } from './shared/main-feed/main-feed.component';
import { GalleryComponent } from './shared/gallery/gallery.component';
import { HomeShopComponent } from './shared/home-shop/home-shop.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationBarComponent,
    MainFeedComponent,
    GalleryComponent,
    HomeShopComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    NgImageSliderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
