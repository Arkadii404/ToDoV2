import { LayoutModule } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ThemeModule } from './../material/theme.module';
import { NotFoundComponent } from './components/not-found/not-found.component';



const SHARED_MODULES = [   
  CommonModule,
  ReactiveFormsModule,
  FormsModule,
  HttpClientModule,
  RouterModule,  
  LayoutModule ,
  ThemeModule
]; 

@NgModule({
  declarations: [NotFoundComponent],
  imports: [
    CommonModule,
    ...SHARED_MODULES
  ],
  exports: [
    ...SHARED_MODULES,
    NotFoundComponent
  ],
  providers: []
})
export class SharedModule { }
