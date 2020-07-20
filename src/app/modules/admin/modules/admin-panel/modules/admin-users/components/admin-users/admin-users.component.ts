import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CoreModels } from 'src/app/core/models';
import { ErrorService } from './../../../../../../../../core/services/error.service';
import { StorageService } from './../../../../../../../../core/services/storage.service';
import { UserService } from './../../../../../../../../core/services/user.service';


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

  public canChangeStatus: boolean;

  public modes: IMode[] = [
    { value: 'id', viewValue: 'ID' }
  ];

  public modeControl = new FormControl(this.modes[0].value);
  public valueControl = new FormControl(null);

  public users: CoreModels.IUser[];

  private sorts = {
    id: true,
    email: false
  }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private readonly userService: UserService,
    private readonly storageService: StorageService,
    private readonly errorService: ErrorService
  ) { }

  ngOnInit() {
    this.userService.getUsers().subscribe(
      users => {
        this.users = users;
        this.dataSource = new MatTableDataSource(users)
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.isLoad = true,
          this.canChangeStatus = users.find(user => user.id == this.storageService.adminId).permisions.includes(2);
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

  public updateStatus(status: string, id: number) {
    console.log(status, id)
    this.userService.updateStatus(status, id).subscribe(
      () => { },
      () => this.errorService.throwServerError('Updation was falied')
    )
  }

  public filter() {
    let mode: string = this.modeControl.value;
    let value: string = this.valueControl.value;
    if (mode === 'none') {
      this.dataSource.data = this.users;
      this.reset();
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
      case 'email':
        this.sorts.email = !this.sorts.email;
        if (this.sorts.email) {
          this.dataSource.data = this.dataSource.data.sort((a, b) => {
            if (a.email > b.email) {
              return -1;
            } else if (a.email < b.email) {
              return 1;
            } else {
              return 0;
            }
          })
        } else {
          this.dataSource.data = this.dataSource.data.sort((a, b) => {
            if (b.email > a.email) {
              return -1;
            } else if (b.email < a.email) {
              return 1;
            } else {
              return 0;
            }
          })
        }
        break;
    }
  }

}
