import { Injectable } from '@angular/core';

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

  constructor() {
    this.cachedUserId = Number(localStorage.getItem(this.userKey));
  }

  public clearUser() {
    this.cachedUserId = null;
    localStorage.removeItem(this.userKey);
  }
}
