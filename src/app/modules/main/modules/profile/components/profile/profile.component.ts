import { DialogComponent } from './../dialog/dialog.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CoreModels } from 'src/app/core/models';
import { ErrorService } from './../../../../../../core/services/error.service';
import { UserService } from './../../../../../../core/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public user: CoreModels.IUser;

  public isLoad: boolean = false;

  constructor(
    private readonly userService: UserService,
    private readonly errorSrvice: ErrorService,
    public readonly dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe(
      user => {
        this.user = user;
        this.isLoad = true;
      },
      () => {
        this.errorSrvice.throwServerError('Can not build profile');
      }
    );
  }

  public openDialog() {
    this.dialog.open(DialogComponent);
  }

}