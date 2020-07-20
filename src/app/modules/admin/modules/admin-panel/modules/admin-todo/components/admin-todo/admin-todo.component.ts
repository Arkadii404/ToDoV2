import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CoreModels } from 'src/app/core/models';
import { ErrorService } from './../../../../../../../../core/services/error.service';
import { TaskService } from './../../../../../../../../core/services/task.service';


interface IMode {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-admin-todo',
  templateUrl: './admin-todo.component.html',
  styleUrls: ['./admin-todo.component.scss']
})
export class AdminTodoComponent implements OnInit {

  public isLoad = false;

  public displayedColumns: string[] = ['id', 'title', 'message', 'userId'];

  public dataSource: MatTableDataSource<any>;

  public modes: IMode[] = [
    { value: 'id', viewValue: 'ID' },
    { value: 'user', viewValue: 'User ID' }
  ];

  public modeControl = new FormControl(this.modes[0].value);
  public valueControl = new FormControl(null);

  public tasks: CoreModels.ITask[];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  private sorts = {
    id: true,
    userId: false
  }

  constructor(
    private readonly taskService: TaskService,
    private readonly errorService: ErrorService
  ) { }

  ngOnInit() {
    this.taskService.getAllTasks().subscribe(
      tasks => {
        this.dataSource = new MatTableDataSource(tasks);
        this.tasks = tasks;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.isLoad = true;
      },
      () => this.errorService.throwServerError('Can not get task')
    )
  }

  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  public filter() {
    let mode: string = this.modeControl.value;
    let value: string = this.valueControl.value;
    if (mode === 'none') {
      this.dataSource.data = this.tasks;
      this.reset();
    } else if (mode === 'id') {
      if (value.includes('<')) {
        this.dataSource.data = this.tasks.filter(task => task.id < Number(value.slice(1)));
      } else if (value.includes('>')) {
        this.dataSource.data = this.tasks.filter(task => task.id > Number(value.slice(1)));
      } else if (value.includes('-')) {
        let start: number = +value.split('-')[0];
        let end: number = +value.split('-')[1];
        this.dataSource.data = this.tasks.filter(task => task.id >= start && task.id <= end);
      } else {
        this.dataSource.data = this.tasks.filter(task => task.id == Number(value));
      }
    } else if (mode === 'user') {
      if (value.includes('<')) {
        this.dataSource.data = this.tasks.filter(task => task.userId < Number(value.slice(1)));
      } else if (value.includes('>')) {
        this.dataSource.data = this.tasks.filter(task => task.userId > Number(value.slice(1)));
      } else if (value.includes('-')) {
        let start: number = +value.split('-')[0];
        let end: number = +value.split('-')[1];
        this.dataSource.data = this.tasks.filter(task => task.userId >= start && task.userId <= end);
      } else {
        this.dataSource.data = this.tasks.filter(task => task.userId == Number(value));
      }
    }
  }

  public reset() {
    this.dataSource.data = this.tasks;
    this.valueControl.reset();
  }

  public check(event: KeyboardEvent) {
    if (event.keyCode === 13) {
      this.filter();
    }
  }

  public sorting(data: string) {
    switch (data) {
      case 'id':
        this.sorts.id = !this.sorts.id;
        if (this.sorts.id) {
          this.dataSource.data = this.dataSource.data.sort((a, b) => a.id - b.id)
        } else {
          this.dataSource.data = this.dataSource.data.sort((a, b) => b.id - a.id)
        }
        break;
      case 'userId':
        this.sorts.userId = !this.sorts.userId;
        if (this.sorts.userId) {
          this.dataSource.data = this.dataSource.data.sort((a, b) => a.userId - b.userId)
        } else {
          this.dataSource.data = this.dataSource.data.sort((a, b) => b.userId - a.userId)
        }
        break;
    }
  }

}
