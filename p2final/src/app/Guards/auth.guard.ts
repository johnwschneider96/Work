import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../Services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const url: string = state.url;
    if (this.verifyLogin(url)) {
      return true;
    } else {
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
      return false;
    }
  }

  verifyLogin(url: string): boolean {
    if (!this.isLoggedIn()) {
        this.router.navigate(['/login']);
        return false;
    } else if (this.isLoggedIn()) {
        return true;
    }
  }
  public isLoggedIn(): boolean {
    let status = false;
    if ( localStorage.getItem('isLoggedIn') === 'true') {
      status = true;
    } else {
      status = false;
    }
    return status;
  }

}
