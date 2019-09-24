import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private messageSource = new BehaviorSubject('');
  currentMessage = this.messageSource.asObservable();

  constructor(
    private router: Router
  ) { }

  changeMessage(message: string) {
    this.messageSource.next(message);
    this.router.navigate(['/search']);
  }
}
