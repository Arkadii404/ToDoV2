import { MatSidenavModule } from '@angular/material/sidenav';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';

const SHARED_MODULES = [   
  CommonModule,
  ReactiveFormsModule,
  FormsModule,
  HttpClientModule,
  RouterModule,
  MatSidenavModule,
  MatInputModule,
  LayoutModule,
  MatToolbarModule,
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule
]; 

@NgModule({
  declarations: [
    MainNavComponent
  ],
  imports: [
    CommonModule,
    ...SHARED_MODULES,
  ],
  exports: [
    ...SHARED_MODULES,
    MainNavComponent
  ]
})
export class SharedModule { }
