import { MatDialog } from '@angular/material/dialog';
import { ErrorService } from './../../../../../../core/services/error.service';
import { FormControl, Validators } from '@angular/forms';
import { UserService } from './../../../../../../core/services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  public password: string;

  public oldCtrl = new FormControl(null, [Validators.required, Validators.minLength(8)]);
  public newCtrl = new FormControl(null, [Validators.required, Validators.minLength(8)]);

  constructor(
    private readonly userService: UserService,
    private readonly errorService: ErrorService,
    public readonly dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe(user => this.password = user.password)
  }

  public submit() {
    if (this.oldCtrl.value === this.password) {
      this.userService.updatePassword(this.newCtrl.value).subscribe(
        () => this.dialog.closeAll(),
        () => this.errorService.throwServerError('Updation was failed')
      )
    } else {
      this.errorService.throwError('Old password is different')
    }
  }

}
