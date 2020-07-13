import { AdminComponent } from './components/admin/admin.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'prefix'
  },
  {
    path: 'auth', loadChildren: () => import('./modules/admin-auth/admin-auth.module').then(
      data => data.AdminAuthModule
    )
  },
  {
    path: 'panel', loadChildren: () => import('./modules/admin-panel/admin-panel.module').then(
      data => data.AdminPanelModule
    )
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }