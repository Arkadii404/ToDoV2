import { ErrorService } from './../../../../../../core/services/error.service';
import { EventService } from './../../../../../../core/services/event.service';
import { StorageService } from './../../../../../../core/services/storage.service';
import { CoreModels } from 'src/app/core/models';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.scss']
})
export class EventCardComponent implements OnInit {

  @Input() event: CoreModels.IEvent;

  public currentUserId: number;

  constructor(
    private readonly storageService: StorageService,
    private readonly eventService: EventService,
    private readonly errorService: ErrorService
  ) { }

  ngOnInit(): void {
    this.currentUserId = this.storageService.userId;
  }

  public update(action: string) {
    if (action === '-') {
      this.event.whoCome = this.event.whoCome.filter(id => id != this.currentUserId)
    } else {
      this.event.whoCome.push(this.currentUserId)
    }
    this.eventService.update(this.event.id, this.event.whoCome).subscribe(
      () => {},
      () => this.errorService.throwServerError('Registration was failed')
    )
  }

}
