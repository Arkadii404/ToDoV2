import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from './../../../../shared/shared.module';
import { DialogComponent } from './components/dialog/dialog.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ProfileRoutingModule } from './profile-routing.module';



@NgModule({
  declarations: [ProfileComponent, DialogComponent],
  imports: [
    CommonModule,
    SharedModule,
    ProfileRoutingModule
  ]
})
export class ProfileModule { }
