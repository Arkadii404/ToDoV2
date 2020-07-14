import { ApiService } from './api.service';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(
    private readonly apiService: ApiService,
    private readonly router: Router
  ) { }

  public getAdminPass(): Observable<string[]> {
    return this.apiService.request('GET', 'admins', {})
  }

  public initAdmin() {
    localStorage.setItem('admin', 'true');
    this.router.navigateByUrl('admin/panel');
  }

  public removeAdmin() {
    localStorage.removeItem('admin');
  }
  
}
