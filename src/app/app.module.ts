import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ToastrModule } from 'ngx-toastr';
import { NgImageSliderModule } from 'ng-image-slider';
import { NgxsModule } from '@ngxs/store';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import {ProductsState} from './store/products/products.state';


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
import { DashboardComponent } from './dashboard/dashboard.component';
import { NewMembersComponent } from './dashboard/new-members/new-members.component';
import { ShopCartComponent } from './shop-cart/shop-cart.component';
import { AddProductComponent } from './dashboard/add-product/add-product.component';
import { OrderListComponent } from './dashboard/order-list/order-list.component';
import { UpdateUserComponent } from './user-detail/update-user/update-user.component';
import { BraListComponent } from './shared/bra-list/bra-list.component';
import { UndiesListComponent } from './shared/undies-list/undies-list.component';
import { SetsListComponent } from './shared/sets-list/sets-list.component';
import { ProductDetailComponent } from './shared/product-detail/product-detail.component';
import {ShoppingCartState} from './store/shoppingCart/shoppingCart.state';

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
    DashboardComponent,
    NewMembersComponent,
    ShopCartComponent,
    AddProductComponent,
    OrderListComponent,
    UpdateUserComponent,
    BraListComponent,
    UndiesListComponent,
    SetsListComponent,
    ProductDetailComponent
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
    ReactiveFormsModule,
    NgxsModule.forRoot(
      [
        ProductsState,
        ShoppingCartState
      ]
    ),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsStoragePluginModule.forRoot()
  ],
  providers: [AuthService, UserService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
