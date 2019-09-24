import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
import { User } from '../../Models/user';
import { NavbarService } from '../../Services/navbar.service';
import { HttpClient } from '@angular/common/http';
import { Story } from '../../Models/story';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  story: Story;
  user: User;
  postForm: FormGroup;
  myresponse: any;
  constructor(
    private http: HttpClient,
    private router: Router,
    public authService: AuthService,
    private nav: NavbarService) {
    this.nav.show();
  }

  getAllStories() {
    this.http.get('http://localhost:9005/P2FB_Application/allstorys').subscribe(
      data => {
        this.myresponse = data;
        console.log(this.myresponse);
      },
      error => {
        console.log('Error occured', error);
      }
    );
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('token'));
    this.getAllStories();
  }

  addLike(s: Story) {
    s.numLikes = s.numLikes + 1;
    this.http.put('http://localhost:9005/P2FB_Application/updatestory', JSON.stringify(s)).subscribe(
      data => {
      },
      error => {
        console.log('Error Occured:' + error);
        alert('Like failed');
      }
    );
  }

  logout(): void {
    alert('logout successful');
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
