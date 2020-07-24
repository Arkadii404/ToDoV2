import { NgModule } from '@angular/core';
import { SharedModule } from './../../../../shared/shared.module';
import { AdminPanelRoutingModule } from './admin-panel-routing.moudle';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';



@NgModule({
  declarations: [AdminPanelComponent],
  imports: [
    AdminPanelRoutingModule,
    SharedModule
  ]
})
export class AdminPanelModule { }
