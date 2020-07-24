import { NgModule } from '@angular/core';
import { SharedModule } from './../../../../../../shared/shared.module';
import { AdminUsersRoutingModule } from './admin-users-routing.module';
import { AdminUsersComponent } from './components/admin-users/admin-users.component';



@NgModule({
  declarations: [AdminUsersComponent],
  imports: [
    AdminUsersRoutingModule,
    SharedModule
  ]
})
export class AdminUsersModule { }
