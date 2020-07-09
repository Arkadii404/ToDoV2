import { AuthGuard } from './core/guards/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo: 'main', pathMatch: 'full'},
  {path: 'main', canActivate: [AuthGuard],loadChildren: () => import('./modules/main/main.module').then(
    data => data.MainModule
  )},
  {path: 'auth', canActivate: [AuthGuard],loadChildren: () => import('./modules/auth/auth.module').then(
    data => data.AuthModule
  )},
  {path: 'admin', loadChildren: () => import('./modules/admin/admin.module').then(
    data => data.AdminModule
  )}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }