import { StorageService } from './../../../../../../../../core/services/storage.service';
import { UserService } from './../../../../../../../../core/services/user.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CoreModels } from 'src/app/core/models';
import { ErrorService } from './../../../../../../../../core/services/error.service';
import { EventService } from './../../../../../../../../core/services/event.service';


interface IMode {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-admin-events',
  templateUrl: './admin-events.component.html',
  styleUrls: ['./admin-events.component.scss']
})
export class AdminEventsComponent implements OnInit {

  public canAddEvent: boolean;

  public isLoad: boolean = false;

  public events: CoreModels.IEvent[];

  public dataSource: MatTableDataSource<any>;

  public displayedColumns: string[] = ['id', 'title', 'theme', 'place', 'date', 'whoCome', 'description'];

  public modes: IMode[] = [
    {value: 'id', viewValue: 'ID'}
  ];

  public modeControl = new FormControl(this.modes[0].value);
  public valueControl = new FormControl(null);

  private sorts = {
    id: true,
    date: false
  }

  constructor(
    private readonly eventService: EventService,
    private readonly errorService: ErrorService,
    private readonly userService: UserService,
    private readonly storageSrvice: StorageService
  ) { }


  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit(): void {
    this.eventService.getEvents().subscribe(
      events => {
        this.events = events;        
        events.forEach(event => {
          let date = new Date(event.date);
          let day = date.getDate().toString();
          let month = date.getMonth().toString();
          let year = date.getFullYear().toString();
          if (day.length == 1) {
            day = '0' + day;
          }
          if (month.length == 1) {
            month = '0' + month;
          }
          event.date = `${day}.${month}.${year}`;
        })
        this.dataSource = new MatTableDataSource(events);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.isLoad = true;
      },
      () => this.errorService.throwServerError('Can not get events')
    );
    this.eventService.addSubject$.asObservable().subscribe(
      event => {
        this.dataSource.data.push(event)
      }
    );
    this.userService.getUser(this.storageSrvice.adminId).subscribe(
      user => {
        this.canAddEvent = user.permisions.includes(3);
      },
      () => this.errorService.throwServerError('Can not get permisions')
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
      this.dataSource.data = this.events;
      this.reset();
    } else if (mode === 'id') {
      if (value.includes('<')) {
        this.dataSource.data = this.events.filter(event => event.id < Number(value.slice(1)));
      } else if (value.includes('>')) {
        this.dataSource.data = this.events.filter(event => event.id > Number(value.slice(1)));
      } else if (value.includes('-')) {
        let start: number = +value.split('-')[0];
        let end: number = +value.split('-')[1];
        this.dataSource.data = this.events.filter(event => event.id >= start && event.id <= end);
      } else {
        this.dataSource.data = this.events.filter(event => event.id == Number(value));
      }
    }
  }

  public reset() {
    this.dataSource.data = this.events;
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
      case 'date':
        this.sorts.date = !this.sorts.date;
        if (this.sorts.date) {
          this.dataSource.data = this.dataSource.data.sort((a, b) => {
            if (a.date > b.date) {
              return -1;
            } else if (a.date < b.date) {
              return 1;
            } else {
              return 0;
            }
          })
        } else {
          this.dataSource.data = this.dataSource.data.sort((a, b) => {
            if (b.date > a.date) {
              return -1;
            } else if (b.date < a.date) {
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