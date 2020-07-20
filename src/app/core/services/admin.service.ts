import { CoreModels } from 'src/app/core/models';
import { StorageService } from './storage.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, forkJoin } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(
    private readonly storageService: StorageService,
    private readonly apiService: ApiService
  ) { }

  public initAdmin(id: number) {
    this.storageService.initAdmin(id);
  }

  public removeAdmin() {
    this.storageService.removeAdmin();
  }

  public getFeaturesAndPermisions(): Observable<[CoreModels.IFeature[], CoreModels.IPermision[]]> {
    return forkJoin([
      this.apiService.request('GET', 'features', {}),
      this.apiService.request('GET', 'permisions', {})
    ])
  }

  public updateFeatures(id: number, features: number[]): Observable<CoreModels.IUser> {
    return this.apiService.request('PATCH', `users/${id}`, {features});
  }

  public updatePermisions(id: number, permisions: number[]): Observable<CoreModels.IUser> {
    return this.apiService.request('PATCH', `users/${id}`, {permisions});
  }
  
}
