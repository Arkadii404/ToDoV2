import { UpComponent } from './components/up/up.component';
import { InComponent } from './components/in/in.component';
import { AuthComponent } from './components/auth/auth.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {path: '', component: AuthComponent, 
  children: [
      {
        path: '',
        redirectTo: 'sign-in',
        pathMatch: 'prefix'
      },
      {
        path: 'sign-in',
        component: InComponent
      },
      {
        path: 'sign-up',
        component: UpComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { 
}