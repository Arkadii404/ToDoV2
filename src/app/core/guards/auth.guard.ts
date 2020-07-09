import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private readonly router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {

    if (state.url.startsWith('/main')) {
      if (localStorage.getItem('user')) {
        return true;
      } else {
        this.router.navigateByUrl('auth');
        return false;
      }
    } else {
      if (!localStorage.getItem('user')) {
        return true;        
      } else {
        this.router.navigateByUrl('main');
        return false;
      }
    }

  }
  
}