import { ErrorService } from '@core/services/error.service';
import { StorageService } from '@core/services/storage.service';
import { UserService } from '@core/services/user.service';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss']
})
export class StepperComponent implements OnInit {
  public hide = true;
  public isLinear = true;

  public firstFormGroup: FormGroup;
  public secondFormGroup: FormGroup;
  public thirdFormGroup: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private readonly userService: UserService,
    private readonly router: Router,
    private readonly storageService: StorageService,
    private readonly errorService: ErrorService
  ) {}

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', [Validators.required, Validators.email]]
    });
    this.thirdFormGroup = this._formBuilder.group({
      thirdCtrl: ['', Validators.required]
    });
  }

  public addUser() {
    this.userService.get().subscribe(
      users => {
        if (users.filter(user => user.email === this.secondFormGroup.controls.secondCtrl.value).length) {
          this.errorService.throwError('User with this email has been registrated yet')
          this.router.navigateByUrl('auth/sign-in')
        } else {
          this.userService.setUser({
            name: this.firstFormGroup.controls.firstCtrl.value,
            email: this.secondFormGroup.controls.secondCtrl.value,
            password: this.thirdFormGroup.controls.thirdCtrl.value,
            status: 'active',
            features: [],
            permisions: []
          }).subscribe(
            user => {
              this.router.navigateByUrl('main');
              this.storageService.userId = user.id;
            },
            () => this.errorService.throwServerError('Can not add user')
          )
        }
      },
      () => {
        this.errorService.throwServerError('Can not get users')
      }
    );  
  }

}
