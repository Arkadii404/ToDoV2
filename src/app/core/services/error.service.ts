import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';


@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(private readonly snackBar: MatSnackBar) {}

  public throwError(text: string) {
    this.openSnackBar(`Error ${text}`);
  }

  public throwServerError(text: string) {
    this.openSnackBar(`Server error ${text}. Try it letter`);
  }

  private openSnackBar(text: string) {
    this.snackBar.open(text, null, {
      duration: 4000,
      horizontalPosition: 'right',
      verticalPosition: 'top'
    });
  }
}
