import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './Components/profile/profile.component';
import { RegisterComponent } from './Components/register/register.component';
import { LoginComponent } from './Components/login/login.component';
import { FeedComponent } from './Components/feed/feed.component';
import { AuthGuard } from './Guards/auth.guard';
import { ResetPasswordComponent } from './Components/reset-password/reset-password.component';
import { SearchComponent } from './Components/search/search.component';
import { ResetPasswordPageComponent } from './Components/reset-password-page/reset-password-page.component';


const routes: Routes = [

  {path: 'profile', component: ProfileComponent, canActivate : [AuthGuard] },
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'feed', component: FeedComponent, canActivate : [AuthGuard]},
  {path: 'reset-password', component: ResetPasswordComponent},
  {path: 'reset-password-page', component: ResetPasswordPageComponent},
  {path: 'search', component: SearchComponent, canActivate : [AuthGuard]},
  {path: '**', redirectTo: 'feed' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
