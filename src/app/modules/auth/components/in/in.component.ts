import { ErrorService } from './../../../../core/services/error.service';
import { Router } from '@angular/router';
import { StorageService } from './../../../../core/services/storage.service';
import { UserService } from './../../../../core/services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-in',
  templateUrl: './in.component.html',
  styleUrls: ['./in.component.scss']
})
export class InComponent {
  
  constructor(
    private readonly userService: UserService,
    private readonly storageService: StorageService,
    private readonly errorService: ErrorService,
    private readonly router: Router 
  ) { }

  public hide = true;

  public email = new FormControl('', [Validators.required, Validators.email]);
  public password = new FormControl('', [Validators.required, Validators.minLength(8)]);

  public getErrorEmail() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  public getErrorPassword() {
    if (this.password.hasError('required')) {
      return 'You must enter a value';
    }
    return this.password.hasError('minLength') ? 'Short password' : '';
  }

  public handle() {
    this.userService.getUsers().subscribe(
      users => {
        let user = users.find(user => user.password === this.password.value && user.email == this.email.value);
        if (user) {
          if (user.status === 'banned') {
            this.errorService.throwError('You are banned');
          } else {
            this.storageService.userId = user.id;
            this.router.navigateByUrl('main/todo');
          }
        } else {
          this.errorService.throwError('There are no users with this credantials')
        }
      },
      () => {
        this.errorService.throwServerError('Sign in was failed')
      }
    )
  }

}
