import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../Models/user';
import { NavbarService } from '../../Services/navbar.service';
import { DataService } from '../../Services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  user: User;
  myUserData: any;
  myresponse: any;
  message: string;
  urlResponse: any;
  signedUrl: string;

  constructor(
    private http: HttpClient,
    private nav: NavbarService,
    private data: DataService,
    private router: Router
  ) {
    this.nav.show();
  }

  ngOnInit() {
    this.data.currentMessage.subscribe(message => this.message = message);
    this.getuserbyemail(this.message);
    setTimeout(() => {
      if (this.myUserData === null) {
        this.router.navigate(['/profile']);
      } else {
        this.getFile();
        this.getuserstorys(this.myUserData.email);
      }
  }, 3000);
  }

  async getFile() {
    this.urlResponse = await fetch('http://localhost:9005/P2FB_Application/s3/' + this.myUserData.filename, {
      method: 'GET'
    });
    this.signedUrl = await this.urlResponse.text();
  }

  getuserbyemail(email: string) {
    this.http.get('http://localhost:9005/P2FB_Application/' + email + '/userbyemail').subscribe(
      mydata => {
        console.log(mydata);
        this.myUserData = mydata;
      },
      error => {
        console.log('Error occured', error);
      }
    );
  }

  getuserstorys(email: string) {
    this.http.get('http://localhost:9005/P2FB_Application/' + email + '/userstorys').subscribe(
      data => {
        this.myresponse = data;
      },
      error => {
        console.log('Error occured', error);
      }
    );
  }
}
