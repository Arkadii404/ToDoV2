import { ErrorService } from './../../../../../../../../core/services/error.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CoreModels } from 'src/app/core/models';
import { UserService } from './../../../../../../../../core/services/user.service';


@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss']
})
export class AdminUsersComponent implements OnInit {

  public isLoad = false;

  public displayedColumns: string[] = ['id', 'name', 'email', 'password', 'bann'];

  public dataSource: MatTableDataSource<CoreModels.IUser>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private readonly userService: UserService,
    private readonly errorService: ErrorService
  ) { }

  ngOnInit() {
    this.userService.getUsers().subscribe(
      users => {
        this.dataSource = new MatTableDataSource(users)
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.isLoad = true
      },
      () => this.errorService.throwServerError('Can not get user')
    )
  }

  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  public bunn(banned: boolean, id: number) {
    this.userService.bunn(banned, id).subscribe(
      () => { },
      () => this.errorService.throwServerError('Updation was falied')
    )
  }

}
