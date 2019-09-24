import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../Models/user';
import { Router } from '@angular/router';
import { NavbarService } from '../../Services/navbar.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthGuard } from '../../Guards/auth.guard';
// import * as AWS from 'aws-sdk';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;
  filename: string;

  constructor(
    private http: HttpClient,
    private router: Router,
    public nav: NavbarService,
    private formBuilder: FormBuilder,
    private authGuard: AuthGuard,
    ) {
      if (this.authGuard.isLoggedIn()) {
        this.router.navigate(['/feed']);
      }
  }

  ngOnInit() {
    this.nav.hide();
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      phoneNumber: ['', Validators.required]
    });
  }

  get f() { return this.registerForm.controls; }

  submitNewUser(theUser: User) {
    this.http.post('http://localhost:9005/P2FB_Application/insertuser', JSON.stringify(theUser)).subscribe(
      data => {
        alert('Registration Successful');
      },
      error => {
        console.log('Error Occured:' + error);
        alert('Regstration failed');
      }
    );
  }

  async uploadFile(event: any) {
    const file = event.target.files[0];
    this.filename = file.name;

    const urlResponse = await fetch('http://localhost:9005/P2FB_Application/s3/' + file.name, { method: 'PUT' });
    const signedUrl = await urlResponse.text();

    const s3Response = await fetch(signedUrl, { method: 'PUT', body: file });
  }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    const theUser = new User(
      this.registerForm.get('email').value,
      this.registerForm.get('password').value,
      this.filename,
      this.registerForm.get('firstName').value,
      this.registerForm.get('lastName').value,
      this.registerForm.get('phoneNumber').value
    );
    this.submitNewUser(theUser);
    this.router.navigate(['/login']);
  }

}
