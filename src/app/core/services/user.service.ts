import { IServerListService } from './../interfaces/server-list.service.interface';
import { StorageService } from './storage.service';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Injectable } from '@angular/core';

import { CoreModels } from '../models'

@Injectable({
  providedIn: 'root'
})
export class UserService implements IServerListService<CoreModels.IUser> {

  constructor(
    private readonly apiService: ApiService,
    private readonly storageService: StorageService
  ) { }

  public get(): Observable<CoreModels.IUser[]> {
    return this.apiService.request('GET', 'users', {});
  }

  public getDetails(id: number): Observable<CoreModels.IUser> {
    return this.apiService.request('GET', `users/${id}`, {});
  }

  public setUser(user: CoreModels.IUser): Observable<CoreModels.IUser> {
    return this.apiService.request('POST', 'users', user);
  }

  public getCurrentUser(): Observable<CoreModels.IUser> {
    return this.getDetails(this.storageService.userId);
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
