import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from '@core/services/admin.service';
import { ErrorService } from '@core/services/error.service';
import { StorageService } from '@core/services/storage.service';
import { UserService } from '@core/services/user.service';
import { CoreModels } from 'src/app/core/models';
import { PasswordModalComponent } from './../password-modal/password-modal.component';



@Component({
  selector: 'app-admin-permisions',
  templateUrl: './admin-permisions.component.html',
  styleUrls: ['./admin-permisions.component.scss']
})
export class AdminPermisionsComponent implements OnInit {

  public isLoad = false;

  public displayedColumns: string[] = ['id', 'email', 'features', 'permisions'];

  public dataSource: MatTableDataSource<CoreModels.IUser>;

  public canSetFeatures: boolean;

  public canSetPermisions: boolean;

  public modes: CoreModels.IMode[] = [
    {value: 'id', viewValue: 'ID'}
  ];

  public modeControl = new FormControl(this.modes[0].value);
  public valueControl = new FormControl(null);

  public users: CoreModels.IUser[];

  public permisions: CoreModels.IPermision[] = [];

  public features: CoreModels.IFeature[] = [];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private readonly userService: UserService,
    private readonly storageService: StorageService,
    private readonly errorService: ErrorService,
    private readonly adminService: AdminService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.userService.get().subscribe(
      users => {
        this.users = users;
        this.dataSource = new MatTableDataSource(users)
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.isLoad = true,
        this.canSetFeatures = users.find(user => user.id == this.storageService.adminId).permisions.includes(4);
        this.canSetPermisions = users.find(user => user.id == this.storageService.adminId).permisions.includes(5);
      },
      () => this.errorService.throwServerError('Can not get user')
    );
    this.adminService.getFeaturesAndPermisions().subscribe(
      ([features, permisions]) => {
        this.features = features;
        this.permisions = permisions;
      }
    )
  }

  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  public updateFeatures(value: number[], id: number) {
    this.userService.updateFeatures(value, id).subscribe();
  }

  public updatePermisions(value: number[], id: number) {
    this.userService.updatePermisions(value, id).subscribe(
      user => {
        if (!user.adminPassword && user.permisions.includes(1)) {
          this.openDialog(user.id);
        }
      }
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
    } else if (mode === 'status') {
      if (value === 'banned') {
        this.dataSource.data = this.users.filter(user => user.status === 'banned');
      } else if (value === 'active') {
        this.dataSource.data = this.users.filter(user => user.status === 'actice');
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

  public openDialog(id: number) {
    this.dialog.open(PasswordModalComponent, {
      data: {id}
    })
  }

}
