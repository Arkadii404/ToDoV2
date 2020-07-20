import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { StorageService } from './../services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class EventGuard implements CanActivate {
  constructor(
    private readonly storageService: StorageService,
    private readonly router: Router
  ) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      return true
        

  }
  
}
