import { ErrorService } from './../../../../../../../../core/services/error.service';
import { TaskService } from './../../../../../../../../core/services/task.service';
import { CoreModels } from 'src/app/core/models';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-admin-todo',
  templateUrl: './admin-todo.component.html',
  styleUrls: ['./admin-todo.component.scss']
})
export class AdminTodoComponent implements OnInit {

  public isLoad = false;

  public displayedColumns: string[] = ['id', 'title', 'message', 'userId'];
  
  public dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private readonly taskService: TaskService,
    private readonly errorService: ErrorService
  ) { }

  ngOnInit() {
    this.taskService.getAllTasks().subscribe(
      tasks => {
        this.dataSource = new MatTableDataSource(tasks);
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

}
