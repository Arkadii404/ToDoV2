import { TodoRoutingModule } from './todo-routing-module';
import { SharedModule } from './../../../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoComponent } from './components/todo/todo.component';
import { AddTaskComponent } from './components/add-task/add-task.component';


@NgModule({
  declarations: [TodoComponent, AddTaskComponent],
  imports: [
    CommonModule,
    SharedModule,
    TodoRoutingModule
  ]
})
export class TodoModule { }
