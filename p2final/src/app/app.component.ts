import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './Services/auth.service';
import { NavbarService } from './Services/navbar.service';
import { DataService } from './Services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  message: string;

  ngOnInit(): void {
    this.data.currentMessage.subscribe(message => this.message = message);
  }

  constructor(
    private router: Router,
    private authService: AuthService,
    public nav: NavbarService,
    private data: DataService) {}

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  newMessage() {
    const search = document.getElementById('search') as HTMLInputElement;
    this.data.changeMessage(search.value);
  }

}
