import { UserService } from './user.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private readonly userKey = 'user';

  private cachedUserId: number;

  public get userId(): number {
    return this.cachedUserId;
  }

  public set userId(userId: number) {
    localStorage.setItem(this.userKey, String(userId));
    this.cachedUserId = userId;
  }

  public get adminId(): number {
    return Number(sessionStorage.getItem('admin'));
  }

  constructor(
    private readonly router: Router
  ) {
    this.cachedUserId = Number(localStorage.getItem(this.userKey));
  }

  public clearUser() {
    this.cachedUserId = null;
    localStorage.removeItem(this.userKey);
  }

  public initAdmin(id: number) {
    sessionStorage.setItem('admin', String(id));
    this.router.navigateByUrl('admin/panel');
  }

  public removeAdmin() {
    localStorage.removeItem('admin');
  }
  
}
