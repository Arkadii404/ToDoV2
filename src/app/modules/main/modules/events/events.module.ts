import { NgModule } from '@angular/core';
import { SharedModule } from './../../../../shared/shared.module';
import { EventCardComponent } from './components/event-card/event-card.component';
import { EventsComponent } from './components/events/events.component';
import { EventsRoutingModule } from './events-routing.module';



@NgModule({
  declarations: [EventsComponent, EventCardComponent],
  imports: [
    SharedModule,
    EventsRoutingModule
  ]
})
export class EventsModule { }
