import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CoreModels } from 'src/app/core/models';
import { ErrorService } from './../../../../../../../../core/services/error.service';
import { EventService } from './../../../../../../../../core/services/event.service';

@Component({
  selector: 'app-admin-events',
  templateUrl: './admin-events.component.html',
  styleUrls: ['./admin-events.component.scss']
})
export class AdminEventsComponent implements OnInit {

  public isLoad: boolean = false;

  public events: CoreModels.IEvent[];

  public dataSource: MatTableDataSource<any>;

  public displayedColumns: string[] = ['id', 'title', 'theme', 'place', 'date', 'whoCome', 'description'];

  constructor(
    private readonly eventService: EventService,
    private readonly errorService: ErrorService
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
    )
    this.eventService.addSubject$.asObservable().subscribe(
      event => {
        this.dataSource.data.push(event)
      }
    )
  }
  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    console.log(filterValue.trim().toLowerCase())

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
