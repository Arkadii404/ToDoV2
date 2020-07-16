import { ErrorService } from './../../../../../../../../core/services/error.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CoreModels } from 'src/app/core/models';
import { UserService } from './../../../../../../../../core/services/user.service';
import { FormControl } from '@angular/forms';



interface IMode {
  value: string;
  viewValue: string;
}


@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss']
})
export class AdminUsersComponent implements OnInit {

  public isLoad = false;

  public displayedColumns: string[] = ['id', 'name', 'email', 'password', 'bann'];

  public dataSource: MatTableDataSource<CoreModels.IUser>;

  public modes: IMode[] = [
    {value: 'id', viewValue: 'ID'},
    {value: 'status', viewValue: 'Banned'},
  ];

  public modeControl = new FormControl(this.modes[0].value);
  public valueControl = new FormControl(null);

  public users: CoreModels.IUser[];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private readonly userService: UserService,
    private readonly errorService: ErrorService
  ) { }

  ngOnInit() {
    this.userService.getUsers().subscribe(
      users => {
        this.users = users;
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

  public filter() {
    let mode: string = this.modeControl.value;
    let value: string = this.valueControl.value;
    if (mode === 'none') {
      this.dataSource.data = this.users;
    } else if (mode === 'id') {
      if (value.includes('<')) {
        this.dataSource.data = this.users.filter(user => user.id < Number(value.slice(1)));
      } else if (value.includes('>')) {
        this.dataSource.data = this.users.filter(user => user.id > Number(value.slice(1)));
      } else if (value.includes('-')) {
        let start: number = +value.split('-')[0];
        let end: number = +value.split('-')[1];
        this.dataSource.data = this.users.filter(user => user.id >= start && user.id <= end);
      } else {
        this.dataSource.data = this.users.filter(user => user.id == Number(value));
      }
    } else if (mode === 'status') {
      if (value === 'true') {
        this.dataSource.data = this.users.filter(user => user.banned);
      } else {
        this.dataSource.data = this.users.filter(user => !user.banned);
      }
    }
  } 
  public reset() {
    this.dataSource.data = this.users;
    this.valueControl.reset();
  }

  public check(event: KeyboardEvent) {
    if (event.keyCode === 13) {
      this.filter();
    }
  }

}
