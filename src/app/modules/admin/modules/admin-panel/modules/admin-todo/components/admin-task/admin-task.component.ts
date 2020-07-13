import { CoreModels } from '../../../../../../../../core/models';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-admin-task',
  templateUrl: './admin-task.component.html',
  styleUrls: ['./admin-task.component.scss']
})
export class AdminTaskComponent implements OnInit {

  @Input() task: CoreModels.ITask;

  constructor() { }

  ngOnInit(): void {
  }

}
