import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from '@core/guards/admin.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'prefix'
  },
  {
    path: 'auth', canActivate: [AdminGuard], loadChildren: () => import('./modules/admin-auth/admin-auth.module').then(
      data => data.AdminAuthModule
    )
  },
  {
    path: 'panel', canActivate: [AdminGuard], loadChildren: () => import('./modules/admin-panel/admin-panel.module').then(
      data => data.AdminPanelModule
    )
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }