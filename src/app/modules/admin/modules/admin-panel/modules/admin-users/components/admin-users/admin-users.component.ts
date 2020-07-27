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

  public displayedColumns: string[] = ['id', 'name', 'email', 'bann'];

  public canChangeStatus: boolean;

  constructor(
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

}
