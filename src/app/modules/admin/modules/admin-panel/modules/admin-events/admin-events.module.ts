import { SharedModule } from './../../../../../../shared/shared.module';
import { AdminEventsRoutingModule } from './admin-events-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminEventsComponent } from './components/admin-events/admin-events.component';



@NgModule({
  declarations: [AdminEventsComponent],
  imports: [
    CommonModule,
    AdminEventsRoutingModule,
    SharedModule
  ]
})
export class AdminEventsModule { }
