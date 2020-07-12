import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private readonly endpoint: string = 'http://localhost:3000'

  constructor(private readonly http: HttpClient) { }

  public request(metod: string, path: string, dto: {}): Observable<any> {
    const url: string = `${this.endpoint}/${path}`;
    return this.http.request(metod, url, { body: dto }).pipe(
      delay(300)
    );
  }
  
}
