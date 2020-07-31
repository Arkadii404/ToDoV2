import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { EventService } from '@core/services/event.service';
import { ConfirmComponent } from './../confirm/confirm.component';
import { DateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss']
})
export class AddEventComponent implements OnInit {

  public title = new FormControl(null, Validators.required);
  public place = new FormControl(null, Validators.required);
  public theme = new FormControl(null, Validators.required);
  public date = new FormControl(null, Validators.required);
  public description = new FormControl(null, Validators.required);

  constructor(
    private readonly eventService: EventService,
    public readonly dialog: MatDialog,
    private _adapter: DateAdapter<any>
  ) {
    this._adapter.setLocale('ru');
  }

  ngOnInit(): void {
    this.eventService.addSubject$.asObservable().subscribe(
      () => {
        this.title.reset();
        this.place.reset();
        this.theme.reset();
        this.date.reset();
        this.description.reset();
      }
    )
  }

  public dateFilter = (d: Date | null): boolean => {
    return d > new Date();
  }

  public check() {
    this.eventService.currentEvent = {
      date: this.date.value,
      description: this.description.value,
      place: this.place.value,
      theme: this.theme.value,
      title: this.title.value,
      whoCome: []
    }
    this.dialog.open(ConfirmComponent);
  }

}
