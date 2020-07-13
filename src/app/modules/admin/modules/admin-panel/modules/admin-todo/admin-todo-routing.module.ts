import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminTodoComponent } from './components/admin-todo/admin-todo.component';

const routes: Routes = [
    {path: '', component: AdminTodoComponent},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminTodoRoutingModule { }