import { MatDialog } from '@angular/material/dialog';
import { ErrorService } from './../../../../../../../../core/services/error.service';
import { CoreModels } from 'src/app/core/models';
import { EventService } from './../../../../../../../../core/services/event.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit {

  public event: CoreModels.IEvent;

  constructor(
    private readonly eventService: EventService,
    private readonly errorService: ErrorService,
    private readonly dialog: MatDialog
  ) {
    this.event = this.eventService.currentEvent;
  }

  ngOnInit(): void {
  }

  public add() {
    this.eventService.addEvent(this.event).subscribe(
      () => {
        this.dialog.closeAll();
      },
      () => this.errorService.throwServerError('Added was failed')
    )
  }

}
