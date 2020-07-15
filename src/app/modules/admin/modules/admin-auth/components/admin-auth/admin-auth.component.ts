import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AdminService } from './../../../../../../core/services/admin.service';
import { ErrorService } from './../../../../../../core/services/error.service';

@Component({
  selector: 'app-admin-auth',
  templateUrl: './admin-auth.component.html',
  styleUrls: ['./admin-auth.component.scss']
})
export class AdminAuthComponent implements OnInit {

  public passwords: string[];

  public passControl = new FormControl(null, Validators.required);

  constructor(
    private readonly adminSrvice: AdminService,
    private readonly errorService: ErrorService
  ) { }

  ngOnInit(): void {
    this.adminSrvice.getAdminPass().subscribe(
      pass => this.passwords = pass,
      () => this.errorService.throwServerError('Can not get passwords')
    );
  }

  public handle() {
    if (this.passwords.includes(this.passControl.value)) {
      this.adminSrvice.initAdmin();
    } else {
      this.errorService.throwError('There are no admins with this passwords')
    }
  }

  public check(e: KeyboardEvent) {
    if (e.keyCode == 13) {
      this.handle();
    }
  }

}
