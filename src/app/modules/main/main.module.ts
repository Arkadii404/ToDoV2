import { NgModule } from '@angular/core';
import { SharedModule } from './../../shared/shared.module';
import { MainComponent } from './components/main/main.component';
import { MainRoutingModule } from './main-routing.module';



@NgModule({
  declarations: [MainComponent],
  imports: [
    MainRoutingModule,
    SharedModule
  ]
})
export class MainModule { }
