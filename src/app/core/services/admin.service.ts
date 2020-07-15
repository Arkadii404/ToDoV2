import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(
    private readonly apiService: ApiService,
    private readonly router: Router
  ) { }

  public getAdminPass(): Observable<string[]> {
    return this.apiService.request('GET', 'admins', {});
  }

  public initAdmin() {
    localStorage.setItem('admin', 'true');
    this.router.navigateByUrl('admin/panel');
  }

  public removeAdmin() {
    localStorage.removeItem('admin');
  }
  
}
