import { StorageService } from './storage.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(
    private readonly storageService: StorageService,
    private readonly apiService: ApiService
  ) { }

  public getAdminPass(): Observable<string[]> {
    return this.apiService.request('GET', 'admins', {});
  }

  public initAdmin() {
    this.storageService.initAdmin();
  }

  public removeAdmin() {
    this.storageService.removeAdmin();
  }
  
}
