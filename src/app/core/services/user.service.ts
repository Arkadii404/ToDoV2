import { StorageService } from './storage.service';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Injectable } from '@angular/core';

import { CoreModels } from '../models'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private readonly apiService: ApiService,
    private readonly storageService: StorageService
  ) { }

  public setUser(user: CoreModels.IUser): Observable<CoreModels.IUser> {
    return this.apiService.request('POST', 'users', user);
  }

  public getUsers(): Observable<CoreModels.IUser[]> {
    return this.apiService.request('GET', 'users', {});
  }

  public getUser(id: number): Observable<CoreModels.IUser> {
    return this.apiService.request('GET', `users/${id}`, {})
  }

  public getCurrentUser(): Observable<CoreModels.IUser> {
    return this.getUser(this.storageService.userId);
  }

  public updatePassword(password: string): Observable<CoreModels.IUser> {
    return this.apiService.request('PATCH', `users/${this.storageService.userId}`, {password});
  }

  public updateStatus(status: string, id: number): Observable<CoreModels.IUser> {
    return this.apiService.request('PATCH', `users/${id}`, {status});
  }

  public updateFeatures(features: number[], id: number): Observable<CoreModels.IUser> {
    return this.apiService.request('PATCH', `users/${id}`, {features});
  }

  public updatePermisions(permisions: number[], id: number): Observable<CoreModels.IUser> {
    return this.apiService.request('PATCH', `users/${id}`, {permisions});
  }

  public updateAdminPassword(adminPassword: string, id: number): Observable<CoreModels.IUser> {
    return this.apiService.request('PATCH', `users/${id}`, {adminPassword});
  }

}
