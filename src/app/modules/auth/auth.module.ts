import { SharedModule } from './../../shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';
import { NgModule } from '@angular/core';
import { AuthComponent } from './components/auth/auth.component';
import { InComponent } from './components/in/in.component';
import { UpComponent } from './components/up/up.component';



@NgModule({
  declarations: [AuthComponent, InComponent, UpComponent],
  imports: [
    AuthRoutingModule,
    SharedModule
  ]
})
export class AuthModule { }
