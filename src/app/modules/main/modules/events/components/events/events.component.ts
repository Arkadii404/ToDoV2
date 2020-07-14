import { Component, OnInit } from '@angular/core';
import { CoreModels } from 'src/app/core/models';
import { ErrorService } from './../../../../../../core/services/error.service';
import { EventService } from './../../../../../../core/services/event.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

  public isLoad: boolean = false;

  public events: CoreModels.IEvent[];

  constructor(
    private readonly  eventService: EventService,
    private readonly errorSrvice: ErrorService
  ) { }

  ngOnInit(): void {
    this.eventService.getForUser().subscribe(
      events => {
        this.events = events;
        this.isLoad = true;
      }, 
      () => this.errorSrvice.throwServerError('Can not get events')
    )
  }

}
