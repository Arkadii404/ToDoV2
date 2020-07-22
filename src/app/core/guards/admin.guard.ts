import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private readonly router: Router) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      if (state.url.startsWith('/admin/panel')) {
        if (sessionStorage.getItem('admin')) {
          return true;
        } else {
          this.router.navigateByUrl('admin');
          return false;
        }
      } else {
        if (!sessionStorage.getItem('admin')) {
          return true;        
        } else {
          this.router.navigateByUrl('admin/panel');
          return false;
        }
      }
    }
  
}
