import { SharedModule } from './../../../../../../shared/shared.module';
import { AdminTodoRoutingModule } from './admin-todo-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminTodoComponent } from './components/admin-todo/admin-todo.component';



@NgModule({
  declarations: [AdminTodoComponent],
  imports: [
    CommonModule,
    AdminTodoRoutingModule,
    SharedModule
  ]
})
export class AdminTodoModule { }
