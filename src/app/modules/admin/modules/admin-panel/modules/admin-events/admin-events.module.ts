import { SharedModule } from './../../../../../../shared/shared.module';
import { AdminEventsRoutingModule } from './admin-events-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminEventsComponent } from './components/admin-events/admin-events.component';
import { AddEventComponent } from './components/add-event/add-event.component';
import { ConfirmComponent } from './components/confirm/confirm.component';



@NgModule({
  declarations: [AdminEventsComponent, AddEventComponent, ConfirmComponent],
  imports: [
    CommonModule,
    AdminEventsRoutingModule,
    SharedModule
  ]
})
export class AdminEventsModule { }
