import { UserService } from './../../../core/services/user.service';
import { Router } from '@angular/router';
import { AdminService } from './../../../core/services/admin.service';
import { StorageService } from './../../../core/services/storage.service';
import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-admin-nav',
  templateUrl: './admin-nav.component.html',
  styleUrls: ['./admin-nav.component.scss']
})
export class AdminNavComponent implements OnInit {

  public canWatchPermisions: boolean;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private readonly adminService: AdminService,
    private readonly storageService: StorageService,
    private readonly userService: UserService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.userService.getUser(this.storageService.adminId).subscribe(
      user => {
        this.canWatchPermisions = user.permisions.includes(4) || user.permisions.includes(5)
      }
    )
  }

  public exit() {
    this.adminService.removeAdmin();
    this.router.navigateByUrl('')
  }

}
