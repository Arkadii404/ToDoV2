import { UserService } from './../../../core/services/user.service';
import { Router } from '@angular/router';
import { StorageService } from './../../../core/services/storage.service';;
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
  public isAdmin: boolean;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private readonly storageService: StorageService,
    private readonly userService: UserService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe(
      user => {
        this.canWatchEvents = user.features.includes(1);
        this.isAdmin = user.permisions.includes(1);
      }
    )

  }

  public exit() {
    this.storageService.clearUser();
    this.router.navigateByUrl('auth');
  }

}
