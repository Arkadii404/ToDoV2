import { StorageService } from './../../../../../../../../core/services/storage.service';
import { Component, Injector, OnInit } from '@angular/core';
import { EventService } from '@core/services/event.service';
import { UserService } from '@core/services/user.service';
import { CoreModels } from 'src/app/core/models';
import { BaseAdminListComponent } from '../../../../core/base/base-admin-list';



@Component({
  selector: 'app-admin-events',
  templateUrl: './admin-events.component.html',
  styleUrls: ['./admin-events.component.scss']
})
export class AdminEventsComponent extends BaseAdminListComponent<CoreModels.IEvent> implements OnInit {

  public canAddEvent: boolean;

  public displayedColumns: string[] = ['id', 'title', 'theme', 'place', 'date'];

  
  constructor(
    protected readonly service: EventService,
    injector: Injector,
    private readonly userService: UserService
  ) {
    super(injector)
  }

  ngOnInit(): void {
    super.ngOnInit();

    this.service.addSubject$.asObservable().subscribe(
      event => {
        this.dataSource.data.push(event)
      }
    );
    this.userService.getDetails(this.storageService.adminId).subscribe(
      user => {
        this.canAddEvent = user.permisions.includes(3);
      },
      () => this.errorService.throwServerError('Can not get permisions')
    )
  }

  protected processItems(items: CoreModels.IEvent[]) {
    items.forEach(item => {
      let date = new Date(item.date);
      let day = date.getDate().toString();
      let month = date.getMonth().toString();
      let year = date.getFullYear().toString();
      if (day.length == 1) {
        day = '0' + day;
      }
      if (month.length == 1) {
        month = '0' + month;
      }
      item.date = `${day}.${month}.${year}`;
    })
  }

}