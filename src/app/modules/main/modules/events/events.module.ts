import { MaterialModule } from './../../../../material/material.module';
import { EventsRoutingModule } from './events-routing.module';
import { SharedModule } from './../../../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventsComponent } from './components/events/events.component';



@NgModule({
  declarations: [EventsComponent],
  imports: [
    CommonModule,
    SharedModule,
    EventsRoutingModule,
    MaterialModule
  ]
})
export class EventsModule { }
