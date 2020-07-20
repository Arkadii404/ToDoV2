import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from './../../../../../../shared/shared.module';
import { AdminPermisionsRoutingModule } from './admin-permisions-routing.module';
import { AdminPermisionsComponent } from './components/admin-permisions/admin-permisions.component';
import { PasswordModalComponent } from './components/password-modal/password-modal.component';



@NgModule({
  declarations: [AdminPermisionsComponent, PasswordModalComponent],
  imports: [
    CommonModule,
    AdminPermisionsRoutingModule,
    SharedModule
  ]
})
export class AdminPermisionsModule { }
