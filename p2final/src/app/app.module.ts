import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { RegisterComponent } from './Components/register/register.component';
import { LoginComponent } from './Components/login/login.component';
import { FeedComponent } from './Components/feed/feed.component';
import { StoryComponent } from './Components/story/story.component';
import { NavbarService } from './Services/navbar.service';
import { AuthService } from './Services/auth.service';
import { AuthGuard } from './Guards/auth.guard';
import { ResetPasswordComponent } from './Components/reset-password/reset-password.component';
import { CreatePostComponent } from './Components/create-post/create-post.component';
import { SearchComponent } from './Components/search/search.component';
import { CommentComponent } from './Components/comment/comment.component';
import { CreateCommentComponent } from './Components/create-comment/create-comment.component';
import { ResetPasswordPageComponent } from './Components/reset-password-page/reset-password-page.component';

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    RegisterComponent,
    LoginComponent,
    FeedComponent,
    StoryComponent,
    ResetPasswordComponent,
    CreatePostComponent,
    SearchComponent,
    CommentComponent,
    CreateCommentComponent,
    ResetPasswordPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule
  ],
  providers: [NavbarService, AuthGuard, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
