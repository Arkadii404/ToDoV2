import { MaterialModule } from './../material/material.module';
import { LayoutModule } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';



const SHARED_MODULES = [   
  CommonModule,
  ReactiveFormsModule,
  FormsModule,
  HttpClientModule,
  RouterModule,  
  LayoutModule ,
  MaterialModule
]; 

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ...SHARED_MODULES
  ],
  exports: [
    ...SHARED_MODULES
  ]
})
export class SharedModule { }
