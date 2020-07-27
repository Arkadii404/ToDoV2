import { UserService } from '@core/services/user.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-admin-details',
  templateUrl: './admin-details.component.html',
  styleUrls: ['./admin-details.component.scss']
})
export class AdminDetailsComponent {

  public permisions: number[];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private readonly userServuce: UserService
  ) { }

}
