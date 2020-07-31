import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CoreModels } from '@core/models';
import { AdminService } from '@core/services/admin.service';
import { ErrorService } from '@core/services/error.service';
import { UserService } from '@core/services/user.service';
import { PasswordModalComponent } from '../password-modal/password-modal.component';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

  public features: CoreModels.IFeature[];

  public permisions: CoreModels.IPermision[];

  public canSetFeatures: boolean;

  public canSetPermisions: boolean;

  public canSetStatus: boolean;

  @Input() user: CoreModels.IUser;

  constructor(
    private readonly userService: UserService,
    private readonly errorService: ErrorService,
    private readonly adminService: AdminService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.userService.getDetails(Number(sessionStorage.getItem('admin'))).subscribe(
      user => {
        this.canSetPermisions = user.permisions.includes(5);
        this.canSetFeatures = user.permisions.includes(4);
        this.canSetStatus = user.permisions.includes(2);
      }
    );
    this.adminService.getFeaturesAndPermisions().subscribe(
      ([features, permisions]) => {
        this.features = features;
        this.permisions = permisions;
      }
    );
  }

  public updateStatus(status: string, id: number) {
    this.userService.updateStatus(status, id).subscribe(
      () => { },
      () => this.errorService.throwServerError('Updation was falied')
    )
  }

  public updateFeatures(value: number[], id: number) {
    this.userService.updateFeatures(value, id).subscribe();
  }

  public updatePermisions(value: number[], id: number) {
    this.userService.updatePermisions(value, id).subscribe(
      user => {
        if (!user.adminPassword && user.permisions.includes(1)) {
          this.openDialog(user.id);
        }
      }
    )
  }

  public openDialog(id: number) {
    this.dialog.open(PasswordModalComponent, {
      data: {id}
    })
  }

}