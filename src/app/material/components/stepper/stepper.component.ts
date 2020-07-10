import { StorageService } from './../../../core/services/storage.service';
import { UserService } from './../../../core/services/user.service';
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
    private readonly storageService: StorageService
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
    this.userService.getUsers().subscribe(
      users => {
        if (users.filter(user => user.email === this.secondFormGroup.controls.secondCtrl.value).length) {
          console.error('User with this email has been registrated yet')
          this.router.navigateByUrl('auth/sign-in')
        } else {
          this.userService.setUser({
            name: this.firstFormGroup.controls.firstCtrl.value,
            email: this.secondFormGroup.controls.secondCtrl.value,
            password: this.thirdFormGroup.controls.thirdCtrl.value,
            banned: false
          }).subscribe(
            user => {
              this.router.navigateByUrl('main');
              this.storageService.userId = user.id;
            },
            err => console.error(err)
          )
        }
      }
    );  
  }

}
