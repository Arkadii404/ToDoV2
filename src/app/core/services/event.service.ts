import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { CoreModels } from '../models';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  public currentEvent: CoreModels.IEvent;

  public addSubject$ = new Subject<boolean>();

  constructor(
    private readonly apiService: ApiService
  ) { }

  public addEvent(dto: CoreModels.IEvent): Observable<CoreModels.IEvent> {
    return this.apiService.request('POST', 'events', dto);
  }

  public getEvents(): Observable<CoreModels.IEvent[]> {
    return this.apiService.request('GET', 'events', {});
  }

}
