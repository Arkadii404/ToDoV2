import { EventGuard } from './../../core/guards/event.guard';
import { MainComponent } from './components/main/main.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '', component: MainComponent,
    children: [
      {
        path: '',
        redirectTo: 'todo',
        pathMatch: 'full'
      },
      {
        path: 'todo', loadChildren: () => import('./modules/todo/todo.module').then(
          data => data.TodoModule
        )
      },
      {
        path: 'profile', loadChildren: () => import('./modules/profile/profile.module').then(
          data => data.ProfileModule
        )
      },
      {
        path: 'events', canActivate: [EventGuard] ,loadChildren: () => import('./modules/events/events.module').then(
          data => data.EventsModule
        )
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule {
}