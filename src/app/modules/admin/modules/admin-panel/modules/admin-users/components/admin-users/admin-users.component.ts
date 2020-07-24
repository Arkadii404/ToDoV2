import { StorageService } from './../../../../../../../../core/services/storage.service';
import { Component, Injector, OnInit } from '@angular/core';
import { UserService } from '@core/services/user.service';
import { CoreModels } from 'src/app/core/models';
import { BaseAdminListComponent } from '../../../../core/base/base-admin-list';



@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss']
})
export class AdminUsersComponent extends BaseAdminListComponent<CoreModels.IUser> implements OnInit {

  public displayedColumns: string[] = ['id', 'name', 'email', 'password', 'bann'];

  public canChangeStatus: boolean;

  constructor(
    private readonly storageService: StorageService,
    protected readonly service: UserService,
    injector: Injector
  ) { 
    super(injector)
  }

  ngOnInit() {
    super.ngOnInit();
    this.service.get().subscribe(
      items => {
        this.canChangeStatus = items.find(user => user.id == this.storageService.adminId).permisions.includes(2);
      },
      () => this.errorService.throwServerError('Can not get user')
    )
  }

  public updateStatus(status: string, id: number) {
    this.service.updateStatus(status, id).subscribe(
      () => { },
      () => this.errorService.throwServerError('Updation was falied')
    )
  }

  public filter() {
    let mode: string = this.modeControl.value;
    let value: string = this.valueControl.value;
    if (mode === 'none') {
      this.dataSource.data = this.items;
      this.reset();
    } else if (mode === 'id') {
      if (value.includes('<')) {
        this.dataSource.data = this.items.filter(user => user.id < Number(value.slice(1)));
      } else if (value.includes('>')) {
        this.dataSource.data = this.items.filter(user => user.id > Number(value.slice(1)));
      } else if (value.includes('-')) {
        let start: number = +value.split('-')[0];
        let end: number = +value.split('-')[1];
        this.dataSource.data = this.items.filter(user => user.id >= start && user.id <= end);
      } else {
        this.dataSource.data = this.items.filter(user => user.id == Number(value));
      }
    }
  }

}
