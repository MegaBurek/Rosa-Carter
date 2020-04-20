import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { NgImageSliderModule } from 'ng-image-slider';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationBarComponent } from './shared/navigation-bar/navigation-bar.component';
import { MainFeedComponent } from './shared/main-feed/main-feed.component';
import { GalleryComponent } from './shared/gallery/gallery.component';
import { HomeShopComponent } from './shared/home-shop/home-shop.component';
import { LoginComponent } from './shared/login/login.component';
import { AuthGuard } from './services/auth/auth.guard';
import { AuthService } from './services/auth/auth.service';
import { UserService } from './services/users/user.service';
import { RegisterComponent } from './shared/register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationBarComponent,
    MainFeedComponent,
    GalleryComponent,
    HomeShopComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule, 
    AngularFireAuthModule,
    NgImageSliderModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [AuthService,UserService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
