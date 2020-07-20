import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPermisionsComponent } from './components/admin-permisions/admin-permisions.component';

const routes: Routes = [
  { path: '', component: AdminPermisionsComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminPermisionsRoutingModule { }