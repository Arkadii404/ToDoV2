import { EventsRoutingModule } from './events-routing.module';
import { SharedModule } from './../../../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventsComponent } from './components/events/events.component';
import { EventCardComponent } from './components/event-card/event-card.component';



@NgModule({
  declarations: [EventsComponent, EventCardComponent],
  imports: [
    CommonModule,
    SharedModule,
    EventsRoutingModule
  ]
})
export class EventsModule { }
