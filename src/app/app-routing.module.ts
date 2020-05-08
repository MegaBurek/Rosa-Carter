import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './shared/login/login.component';
import { MainFeedComponent } from './shared/main-feed/main-feed.component';
import { AuthGuard } from './services/auth/auth.guard';
import { RegisterComponent } from './shared/register/register.component';
import { AccountCompletionComponent } from './shared/account-completion/account-completion.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ShopCartComponent } from './shop-cart/shop-cart.component';
import { AddProductComponent } from './dashboard/add-product/add-product.component';
import { OrderListComponent } from './dashboard/order-list/order-list.component';
import { UpdateUserComponent } from './user-detail/update-user/update-user.component';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, data: { animation: { value: 'LoginPage' }}},
  { path: 'register', component: RegisterComponent, data: { animation: { value: 'RegisterPage' }}},
  { path: 'home', component: MainFeedComponent, data: { animation: { value: 'HomePage' }}},
  { path: 'accountCompletion', component:AccountCompletionComponent, data: { animation: { value: 'accountCompletionPage' }}},
  { path: 'shopping-cart', component:ShopCartComponent, data: { animation: { value: 'shopcartPage' }}},
  { path: 'myProfile', component: UserDetailComponent, data: { animation: { value: 'MyHomePage' }},canActivate: [AuthGuard] },
  { path: 'editProfile', component: UpdateUserComponent, data: { animation: { value: 'EditProfilePage' }},canActivate: [AuthGuard] },
  { path: 'dashboard', component: DashboardComponent, data: { animation: {value: 'DashboardPage'}}, canActivate: [AuthGuard]},
  { path: 'addProduct', component: AddProductComponent, data: { animation: {value: 'AddProductPage'}}, canActivate: [AuthGuard]},
  { path: 'currentOrders', component: OrderListComponent, data: { animation: {value: 'OrderListPage'}}, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
