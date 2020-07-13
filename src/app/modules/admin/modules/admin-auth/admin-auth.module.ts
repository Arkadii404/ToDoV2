import { SharedModule } from './../../../../shared/shared.module';
import { AdminAuthRoutingModule } from './admin-auth-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminAuthComponent } from './components/admin-auth/admin-auth.component';



@NgModule({
  declarations: [AdminAuthComponent],
  imports: [
    CommonModule,
    AdminAuthRoutingModule,
    SharedModule
  ]
})
export class AdminAuthModule { }
