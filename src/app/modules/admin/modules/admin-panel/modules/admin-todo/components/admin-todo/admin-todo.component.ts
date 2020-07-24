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

  public filter() {
    let mode: string = this.modeControl.value;
    let value: string = this.valueControl.value;
    if (mode === 'none') {
      this.dataSource.data = this.items;
      this.reset();
    } else if (mode === 'id') {
      if (value.includes('<')) {
        this.dataSource.data = this.items.filter(task => task.id < Number(value.slice(1)));
      } else if (value.includes('>')) {
        this.dataSource.data = this.items.filter(task => task.id > Number(value.slice(1)));
      } else if (value.includes('-')) {
        let start: number = +value.split('-')[0];
        let end: number = +value.split('-')[1];
        this.dataSource.data = this.items.filter(task => task.id >= start && task.id <= end);
      } else {
        this.dataSource.data = this.items.filter(task => task.id == Number(value));
      }
    } else if (mode === 'user') {
      if (value.includes('<')) {
        this.dataSource.data = this.items.filter(task => task.userId < Number(value.slice(1)));
      } else if (value.includes('>')) {
        this.dataSource.data = this.items.filter(task => task.userId > Number(value.slice(1)));
      } else if (value.includes('-')) {
        let start: number = +value.split('-')[0];
        let end: number = +value.split('-')[1];
        this.dataSource.data = this.items.filter(task => task.userId >= start && task.userId <= end);
      } else {
        this.dataSource.data = this.items.filter(task => task.userId == Number(value));
      }
    }
  }

}
