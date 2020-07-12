import { ErrorService } from './../../../../../../core/services/error.service';
import { CoreModels } from 'src/app/core/models';
import { StorageService } from './../../../../../../core/services/storage.service';
import { TaskService } from './../../../../../../core/services/task.service';
import { FormControl, Validators } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent {

  public title = new FormControl('', Validators.required);
  public message = new FormControl('', Validators.required);

  constructor(
    private readonly taskService: TaskService,
    private readonly storageService: StorageService,
    private readonly errorService: ErrorService 
  ) { }

  public addTask() {
    let task: CoreModels.ITask = {
      title: this.title.value,
      message: this.message.value,
      isDone: false,
      time: new Date(),
      userId: this.storageService.userId
    };
    this.taskService.setTask(task).subscribe(
      () => {
        this.taskService.addTasksSubject$.next(task)
        this.resetForm()
      },
      () => this.errorService.throwServerError('Added was failed')
    )
  }

  public resetForm() {
    this.title.reset();
    this.message.reset();
  }

}
