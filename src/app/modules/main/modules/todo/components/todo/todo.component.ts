import { ErrorService } from './../../../../../../core/services/error.service';
import { TaskService } from './../../../../../../core/services/task.service';
import { Component, OnInit } from '@angular/core';
import { CoreModels } from 'src/app/core/models';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  public tasks: CoreModels.ITask[];

  public isLoad = false;

  constructor(
    private readonly taskService: TaskService,
    private readonly errorService: ErrorService
  ) { }

  ngOnInit(): void {
    this.taskService.getTusksOfCurrentUser().subscribe(
      tasks => {this.tasks = tasks.sort((a, b) => {
        if (a.time > b.time) {
          return -1
        } else {
          return 1
        }
      });
        this.isLoad = true;
      }, 
      () => this.errorService.throwServerError('Can not get tasks')
    );

    this.taskService.removeSubject$.asObservable().subscribe(      
      id => {this.tasks = this.tasks.filter(task => task.id !== id);console.log(id)}
    );

    this.taskService.addTasksSubject$.asObservable().subscribe(task => this.tasks.unshift(task));
  }

}
