import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';

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
  )},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }