import { StorageService } from './../services/storage.service';
import { FeatchesService } from './../services/featchers.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventGuard implements CanActivate {
  constructor(
    private readonly featchesService: FeatchesService,
    private readonly storageService: StorageService,
    private readonly router: Router
  ) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      return this.featchesService.featches['watch-events'].includes(this.storageService.userId);
        

  }
  
}
