import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
import { NavbarService } from '../../Services/navbar.service';
import { AuthGuard } from '../../Guards/auth.guard';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  myresponse: any;
  loginForm: FormGroup;
  message: string;
  submitted = false;
  returnUrl: string;

  constructor(
    private http: HttpClient,
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    private authGuard: AuthGuard,
    public nav: NavbarService
  ) {
    if (this.authGuard.isLoggedIn()) {
      this.router.navigate(['/login']);
    }
  }

  ngOnInit() {
    this.loginForm = this.fb.group ({
      email: ['', Validators.required],
      password: ['', Validators.required]
     });
    this.authService.logout();
    this.returnUrl = '/feed';
    this.nav.hide();
  }

  get f() { return this.loginForm.controls; }

  getuserbyemail() {
    this.http.get('http://localhost:9005/P2FB_Application/' + this.f.email.value + '/userbyemail').subscribe(
      data => {
        this.myresponse = data;
      },
      error => {
        console.log('Error occured', error);
      }
    );
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    } else {
      this.getuserbyemail();
      if (this.myresponse === null) {
        alert('Login Failed');
        return;
      }
      setTimeout(() => {
        if (this.f.email.value === this.myresponse.email && this.f.password.value === this.myresponse.password) {
          alert('Login Successful');
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('token', JSON.stringify(this.myresponse));
          this.authService.createUser(this.myresponse.email, this.myresponse.password);
          this.router.navigate([this.returnUrl]);
        } else {
          this.message = 'Please check your email and password';
        }
      }, 2000);
    }
  }
}
