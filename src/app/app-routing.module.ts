import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './shared/login/login.component';
import { MainFeedComponent } from './shared/main-feed/main-feed.component';
import { AuthGuard } from './services/auth/auth.guard';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, data: { animation: { value: 'LoginPage' }}},
  { path: 'home', component: MainFeedComponent, data: { animation: { value: 'HomePage' }}}
  // { path: 'myHome', component: MainFeedComponent, data: { animation: { value: 'MyHomePage' }},canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
