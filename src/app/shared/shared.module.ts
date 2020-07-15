import { LayoutModule } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ThemeModule } from './../material/theme.module';



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
  declarations: [],
  imports: [
    CommonModule,
    ...SHARED_MODULES
  ],
  exports: [
    ...SHARED_MODULES
  ],
  providers: []
})
export class SharedModule { }
