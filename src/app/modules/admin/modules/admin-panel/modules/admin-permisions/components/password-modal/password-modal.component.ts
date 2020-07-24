import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from '@core/services/user.service';

@Component({
  selector: 'app-password-modal',
  templateUrl: './password-modal.component.html',
  styleUrls: ['./password-modal.component.scss']
})
export class PasswordModalComponent {

  public passwordControl = new FormControl(null, Validators.required);

  constructor(
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data,
    private readonly userService: UserService
  ) { }

  public submit() {
    this.userService.updateAdminPassword(this.passwordControl.value, this.data.id).subscribe();
    this.dialog.closeAll();
  }

}
