import { NgModule } from '@angular/core';
import { SharedModule } from './../../../../shared/shared.module';
import { DialogComponent } from './components/dialog/dialog.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ProfileRoutingModule } from './profile-routing.module';



@NgModule({
  declarations: [ProfileComponent, DialogComponent],
  imports: [
    SharedModule,
    ProfileRoutingModule
  ]
})
export class ProfileModule { }
