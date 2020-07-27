import { Component, Input } from '@angular/core';
import { CoreModels } from 'src/app/core/models';

@Component({
  selector: 'app-events-details',
  templateUrl: './events-details.component.html',
  styleUrls: ['./events-details.component.scss']
})
export class EventsDetailsComponent {

  @Input() event: CoreModels.IEvent;

}
