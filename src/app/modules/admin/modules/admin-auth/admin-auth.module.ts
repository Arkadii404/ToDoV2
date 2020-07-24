import { NgModule } from '@angular/core';
import { SharedModule } from './../../../../shared/shared.module';
import { AdminAuthRoutingModule } from './admin-auth-routing.module';
import { AdminAuthComponent } from './components/admin-auth/admin-auth.component';



@NgModule({
  declarations: [AdminAuthComponent],
  imports: [
    AdminAuthRoutingModule,
    SharedModule
  ]
})
export class AdminAuthModule { }
