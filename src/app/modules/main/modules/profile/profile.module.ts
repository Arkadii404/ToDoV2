import { MaterialModule } from './../../../../material/material.module';
import { ProfileRoutingModule } from './profile-routing.module';
import { SharedModule } from './../../../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './components/profile/profile.component';
import { DialogComponent } from './components/dialog/dialog.component';



@NgModule({
  declarations: [ProfileComponent, DialogComponent],
  imports: [
    CommonModule,
    SharedModule,
    ProfileRoutingModule,
    MaterialModule
  ]
})
export class ProfileModule { }
