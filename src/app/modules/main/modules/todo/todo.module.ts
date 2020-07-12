import { TodoRoutingModule } from './todo-routing-module';
import { SharedModule } from './../../../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoComponent } from './components/todo/todo.component';
import { AddTaskComponent } from './components/add-task/add-task.component';
import { TaskComponent } from './components/task/task.component';


@NgModule({
  declarations: [TodoComponent, AddTaskComponent, TaskComponent],
  imports: [
    CommonModule,
    SharedModule,
    TodoRoutingModule
  ],
  providers: []
})
export class TodoModule { }
