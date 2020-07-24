import { NgModule } from '@angular/core';
import { SharedModule } from './../../../../shared/shared.module';
import { AddTaskComponent } from './components/add-task/add-task.component';
import { TaskComponent } from './components/task/task.component';
import { TodoComponent } from './components/todo/todo.component';
import { TodoRoutingModule } from './todo-routing-module';


@NgModule({
  declarations: [TodoComponent, AddTaskComponent, TaskComponent],
  imports: [
    SharedModule,
    TodoRoutingModule
  ],
  providers: []
})
export class TodoModule { }
