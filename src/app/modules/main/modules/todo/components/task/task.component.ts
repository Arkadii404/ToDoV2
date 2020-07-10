import { FormControl, Validators } from '@angular/forms';
import { TaskService } from './../../../../../../core/services/task.service';
import { Component, OnInit, Input } from '@angular/core';
import { CoreModels } from 'src/app/core/models';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  @Input() task: CoreModels.ITask;

  public isEditMode: boolean = false;

  public title = new FormControl('', Validators.required);

  public message = new FormControl('', Validators.required);

  constructor(private readonly taskService: TaskService) { }

  ngOnInit(): void {
  }

  public remove() {
    this.taskService.removeTask(this.task.id).subscribe(
      () => this.taskService.removeSubject$.next(this.task.id),
      () => console.error('Un success delete')
    )
  }

  public done() {
    this.task.isDone = !this.task.isDone;
    this.update();
  }

  public update() {
    this.taskService.updateTask(this.task.id, {
      isDone: this.task.isDone,
      message: this.task.message,
      title: this.task.title
    }).subscribe({
      error() {
        console.error('Updation was failed')
      }
    })
  }

  public change() {
    this.update();
    this.toggleEditMode();
  }

  public toggleEditMode() {
    this.isEditMode = !this.isEditMode;
  }

}
