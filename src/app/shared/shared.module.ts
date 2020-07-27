import { PasswordModalComponent } from './components/password-modal/password-modal.component';
import { LayoutModule } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ThemeModule } from './../material/theme.module';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AdminDetailsComponent } from './components/admin-details/admin-details.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { EventsDetailsComponent } from './components/events-details/events-details.component';



const SHARED_MODULES = [
  CommonModule,
  ReactiveFormsModule,
  FormsModule,
  HttpClientModule,
  RouterModule,
  LayoutModule,
  ThemeModule
];

@NgModule({
  declarations: [
    NotFoundComponent,
    AdminDetailsComponent,
    UserDetailsComponent,
    EventsDetailsComponent,
    PasswordModalComponent
  ],
  imports: [
    CommonModule,
    ...SHARED_MODULES
  ],
  exports: [
    ...SHARED_MODULES,
    NotFoundComponent,
    AdminDetailsComponent,
    UserDetailsComponent,
    EventsDetailsComponent,
    PasswordModalComponent
  ],
  providers: []
})
export class SharedModule { }
