import { StorageService } from './../../../core/services/storage.service';
import { FeatchesService } from './../../../core/services/featchers.service';
import { EventService } from './../../../core/services/event.service';
import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss']
})
export class MainNavComponent implements OnInit {

  public canWatchEvents: boolean;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private readonly featchesService: FeatchesService,
    private readonly storageService: StorageService
  ) { }

  ngOnInit(): void {
    this.featchesService.getFeatches().subscribe(data => {
      this.canWatchEvents = data['watch-events'].includes(this.storageService.userId)
    })
  }

}
