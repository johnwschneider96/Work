import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { NavbarService } from 'src/app/Services/navbar.service';
import { Router } from '@angular/router';
import { DataService } from 'src/app/Services/data.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  resetForm: FormGroup;

  constructor(
    private authService: AuthService,
    private nav: NavbarService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.nav.hide();
    this.resetForm = this.formBuilder.group({
      email: ['', Validators.required]
    });
  }

  onSubmit() {
    localStorage.setItem('token', this.resetForm.get('email').value);
    this.authService.auth.sendPasswordResetEmail(this.resetForm.get('email').value);
    this.router.navigate(['/login']);
  }
}
