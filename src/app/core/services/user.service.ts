import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Injectable } from '@angular/core';

import { CoreModels } from '../models'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private readonly apiService: ApiService) { }

  public setUser(user: CoreModels.IUser): Observable<CoreModels.IUser> {
    return this.apiService.request('POST', 'users', user);
  }

  public getUsers(): Observable<CoreModels.IUser[]> {
    return this.apiService.request('GET', 'users', {});
  }

  public getUser(id: number): Observable<CoreModels.IUser> {
    return this.apiService.request('GET', `users/${id}`, {})
  }

}
