import { NgModule } from '@angular/core';
import { SharedModule } from './../../../../../../shared/shared.module';
import { AdminTodoRoutingModule } from './admin-todo-routing.module';
import { AdminTodoComponent } from './components/admin-todo/admin-todo.component';


@NgModule({
  declarations: [AdminTodoComponent],
  imports: [
    AdminTodoRoutingModule,
    SharedModule
  ]
})
export class AdminTodoModule { }
