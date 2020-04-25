import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './shared/login/login.component';
import { MainFeedComponent } from './shared/main-feed/main-feed.component';
import { AuthGuard } from './services/auth/auth.guard';
import { RegisterComponent } from './shared/register/register.component';
import { AccountCompletionComponent } from './shared/account-completion/account-completion.component';
import { UserDetailComponent } from './user-detail/user-detail.component';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, data: { animation: { value: 'LoginPage' }}},
  { path: 'register', component: RegisterComponent, data: { animation: { value: 'RegisterPage' }}},
  { path: 'home', component: MainFeedComponent, data: { animation: { value: 'HomePage' }}},
  { path: 'accountCompletion', component:AccountCompletionComponent, data: { animation: { value: 'accountCompletionPage' }}},
  { path: 'userDetail/:id', component: UserDetailComponent, data: { animation: { value: 'MyHomePage' }},canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
