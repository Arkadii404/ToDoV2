import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators'
import { CoreModels } from '../models';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  public currentEvent: CoreModels.IEvent;

  public addSubject$ = new Subject<CoreModels.IEvent>();

  constructor(
    private readonly apiService: ApiService
  ) { }

  public addEvent(dto: CoreModels.IEvent): Observable<CoreModels.IEvent> {
    this.addSubject$.next(dto);
    return this.apiService.request('POST', 'events', dto);
  }

  public getEvents(): Observable<CoreModels.IEvent[]> {
    return this.apiService.request('GET', 'events', {});
  }

  public getForUser(): Observable<CoreModels.IEvent[]> {
    return this.getEvents().pipe(
      map(
        events => events.filter(event => new Date(event.date) > new Date()).sort((a, b) => {
          if (a.date > b.date) {
            return -1;
          } else if (a.date < b.date) {
            return 1;
          } else {
            return 0;
          }
        })
      )
    )
  }

  public update(id: number, whoCome: number[]): Observable<Partial<CoreModels.IEvent>> {
    return this.apiService.request('PATCH', `events/${id}`, {whoCome});
  }

}
