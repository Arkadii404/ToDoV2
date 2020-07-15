import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FeatchesService {

  public cashedFeatches;

  public get featches() {
    return this.cashedFeatches;
  }

  constructor(
    private readonly apiService: ApiService
  ) { 
    this.getFeatches().subscribe(featches => this.cashedFeatches = featches)
  }

  public getFeatches(): Observable<any> {
    return this.apiService.request('GET', 'features', {});
  }

}
