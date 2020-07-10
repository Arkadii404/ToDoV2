import { MaterialModule } from './../../material/material.module';
import { SharedModule } from './../../shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './components/auth/auth.component';
import { InComponent } from './components/in/in.component';
import { UpComponent } from './components/up/up.component';



@NgModule({
  declarations: [AuthComponent, InComponent, UpComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule,
    MaterialModule
  ]
})
export class AuthModule { }
