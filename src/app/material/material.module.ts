import { DragDropModule } from '@angular/cdk/drag-drop';
import { LayoutModule } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { AdminNavComponent } from './components/admin-nav/admin-nav.component';
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { StepperComponent } from './components/stepper/stepper.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';


const MATERIAL_MODULES = [
  MatSidenavModule,
  MatInputModule,
  MatToolbarModule,
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatStepperModule,
  MatCardModule,
  MatCheckboxModule,
  DragDropModule,
  MatProgressSpinnerModule,
  MatSnackBarModule,
  MatDialogModule,
  MatPaginatorModule,
  MatTableModule,
  MatDatepickerModule,
  MatNativeDateModule
];

@NgModule({
  declarations: [
    MainNavComponent,
    StepperComponent,
    AdminNavComponent
  ],
  imports: [
    CommonModule,
    ...MATERIAL_MODULES,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    LayoutModule
  ],
  exports: [
    ...MATERIAL_MODULES,
    MainNavComponent,
    StepperComponent,
    AdminNavComponent
  ]
})
export class MaterialModule { }
