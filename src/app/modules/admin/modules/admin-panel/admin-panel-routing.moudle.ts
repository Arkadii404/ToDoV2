import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';

const routes: Routes = [
  {
    path: '', component: AdminPanelComponent,
    children: [
      {
        path: '',
        redirectTo: 'auth',
        pathMatch: 'prefix'
      },
      {
        path: 'tasks', loadChildren: () => import('./modules/admin-todo/admin-todo.module').then(
          data => data.AdminTodoModule
        )
      },
      {
        path: 'users', loadChildren: () => import('./modules/admin-users/admin-users.module').then(
          data => data.AdminUsersModule
        )
      },
      {
        path: 'events', loadChildren: () => import('./modules/admin-events/admin-events.module').then(
          data => data.AdminEventsModule
        )
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminPanelRoutingModule { }