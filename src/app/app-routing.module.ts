import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './shared/login/login.component';
import {MainFeedComponent} from './shared/main-feed/main-feed.component';
import {AuthGuard} from './services/auth/auth.guard';
import {RegisterComponent} from './shared/register/register.component';
import {AccountCompletionComponent} from './shared/account-completion/account-completion.component';
import {UserDetailComponent} from './user-detail/user-detail.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {AddProductComponent} from './dashboard/add-product/add-product.component';
import {OrderListComponent} from './dashboard/order-list/order-list.component';
import {UpdateUserComponent} from './user-detail/update-user/update-user.component';
import {BraListComponent} from './shared/bra-list/bra-list.component';
import {UndiesListComponent} from './shared/undies-list/undies-list.component';
import {SetsListComponent} from './shared/sets-list/sets-list.component';
import {ProductDetailComponent} from './shared/product-detail/product-detail.component';
import {CustomPreloadingStrategy} from './custom-preload-route';
import {CartComponent} from './cart/cart.component';


const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent, data: {animation: {value: 'LoginPage'}}},
  {path: 'register', component: RegisterComponent, data: {animation: {value: 'RegisterPage'}}},
  {path: 'home', component: MainFeedComponent, data: {preload: true}, canActivate: [AuthGuard]},
  {path: 'accountCompletion', component: AccountCompletionComponent},
  {path: 'user/:userId', component: UserDetailComponent, canActivate: [AuthGuard]},
  {path: 'editProfile', component: UpdateUserComponent, canActivate: [AuthGuard]},
  {path: 'dashboard', component: DashboardComponent, data: {preload: true}, canActivate: [AuthGuard]},
  {path: 'addProduct', component: AddProductComponent, canActivate: [AuthGuard]},
  {path: 'product/:uid', component: ProductDetailComponent, data: {preload: true}, canActivate: [AuthGuard]},
  {path: 'currentOrders', component: OrderListComponent, data: {preload: true}, canActivate: [AuthGuard]},
  {path: 'bras', component: BraListComponent, data: {preload: true}, canActivate: [AuthGuard]},
  {path: 'undies', component: UndiesListComponent, data: {preload: true}, canActivate: [AuthGuard]},
  {path: 'sets', component: SetsListComponent, data: {preload: true}, canActivate: [AuthGuard]},
  {path: 'cart', component: CartComponent, data: {preload: true}, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: CustomPreloadingStrategy
  })],
  exports: [RouterModule],
  providers: [CustomPreloadingStrategy]
})
export class AppRoutingModule {
}
