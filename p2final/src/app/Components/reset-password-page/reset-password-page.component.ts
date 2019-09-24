import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/Services/auth.service';
import { NavbarService } from 'src/app/Services/navbar.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DataService } from 'src/app/Services/data.service';
import { User } from 'src/app/Models/user';

@Component({
  selector: 'app-reset-password-page',
  templateUrl: './reset-password-page.component.html',
  styleUrls: ['./reset-password-page.component.css']
})
export class ResetPasswordPageComponent implements OnInit {

  resetForm: FormGroup;
  myresponse: any;

  constructor(
    private nav: NavbarService,
    private formBuilder: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private data: DataService
  ) { }

  ngOnInit() {
    this.nav.hide();
    this.resetForm = this.formBuilder.group({
      password: ['', Validators.required]
    });
  }

  getuserbyemail(email: string) {
    this.http.get('http://localhost:9005/P2FB_Application/' + email + '/userbyemail').subscribe(
      mydata => {
        this.myresponse = mydata;
      },
      error => {
        console.log('Error occured', error);
      }
    );
  }

  updateuser(theUser: User) {
    this.http.put('http://localhost:9005/P2FB_Application/updateuser', JSON.stringify(theUser)).subscribe(
      data => {
        alert('User successfully updated');
      },
      error => {
        console.log('Error occured', error);
      }
    );
  }

  onSubmit() {
    console.log(localStorage.getItem('token'));
    this.getuserbyemail(localStorage.getItem('token'));
    setTimeout(() => {
      const theUser = new User(
        this.myresponse.email,
        localStorage.getItem('token'),
        this.myresponse.filename,
        this.myresponse.firstname,
        this.myresponse.lastname,
        this.myresponse.phonenumber
      );
      this.updateuser(theUser);
      localStorage.setItem('isLoggedIn', 'false');
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    }, 2000);
  }
}
