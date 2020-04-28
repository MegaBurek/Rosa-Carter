import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

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
import { AccountCompletionComponent } from './shared/account-completion/account-completion.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { DropzoneDirective } from './dropzone.directive';
import { BrasComponent } from './shared/bras/bras.component';
import { UndiesComponent } from './shared/undies/undies.component';
import { SetsComponent } from './shared/sets/sets.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NewMembersComponent } from './dashboard/new-members/new-members.component';
import { ShopCartComponent } from './shop-cart/shop-cart.component';
import { AddProductComponent } from './dashboard/add-product/add-product.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationBarComponent,
    MainFeedComponent,
    GalleryComponent,
    HomeShopComponent,
    LoginComponent,
    RegisterComponent,
    AccountCompletionComponent,
    UserDetailComponent,
    DropzoneDirective,
    BrasComponent,
    UndiesComponent,
    SetsComponent,
    DashboardComponent,
    NewMembersComponent,
    ShopCartComponent,
    AddProductComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    NgImageSliderModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [AuthService, UserService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
