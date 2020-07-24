import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { CoreModels } from 'src/app/core/models';
import { AdminService } from '@core/services/admin.service';
import { ErrorService } from '@core/services/error.service';
import { StorageService } from '@core/services/storage.service';
import { UserService } from '@core/services/user.service';

@Component({
  selector: 'app-admin-auth',
  templateUrl: './admin-auth.component.html',
  styleUrls: ['./admin-auth.component.scss']
})
export class AdminAuthComponent implements OnInit {

  public users: CoreModels.IUser[];
  public user: CoreModels.IUser;

  public userId = this.storageService.userId;

  public passControl = new FormControl(null, Validators.required);
  public emailControl = new FormControl(null, Validators.required);

  constructor(
    private readonly adminSrvice: AdminService,
    private readonly errorService: ErrorService,
    private readonly storageService: StorageService,
    private readonly userService: UserService
  ) { }

  ngOnInit(): void {
    if (this.userId) {
      this.userService.getCurrentUser().subscribe(user => this.user = user)
    } else {
      this.userService.get().subscribe(users => this.users = users)
    }
  }

  public handle() {
    if (this.userId) {
      if (this.user.adminPassword == this.passControl.value) {
        this.adminSrvice.initAdmin(this.userId)
      } else {
        this.errorService.throwError('Password incorrect')
      }
    } else {
      let user = this.users.find(user => user.email == this.emailControl.value && user.adminPassword == this.passControl.value);
      if (user && user.permisions.includes(1)) {
        this.adminSrvice.initAdmin(user.id)
      } else {
        this.errorService.throwError('There are no admins with this credentials')
      }
    }
  }

  public check(e: KeyboardEvent) {
    if (e.keyCode == 13) {
      this.handle();
    }
  }

}
