import { Component, Injector, OnInit } from '@angular/core';
import { TaskService } from '@core/services/task.service';
import { CoreModels } from 'src/app/core/models';
import { BaseAdminListComponent } from '../../../../core/base/base-admin-list';


@Component({
  selector: 'app-admin-todo',
  templateUrl: './admin-todo.component.html',
  styleUrls: ['./admin-todo.component.scss']
})
export class AdminTodoComponent extends BaseAdminListComponent<CoreModels.ITask> implements OnInit {

  public displayedColumns: string[] = ['id', 'title', 'message', 'userId'];

  public modes: CoreModels.IMode[] = [
    { value: 'id', viewValue: 'ID' },
    { value: 'user', viewValue: 'User ID' },
  ];

  constructor(
    protected readonly service: TaskService,
    injector: Injector
  ) {
    super(injector);
  }

}
