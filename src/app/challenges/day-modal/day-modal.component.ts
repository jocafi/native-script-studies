import { Component, OnInit } from '@angular/core';
import { ModalDialogParams } from 'nativescript-angular/modal-dialog';

import { DayStatus } from '../day.model';

@Component({
  selector: 'ns-day-modal',
  templateUrl: './day-modal.component.html',
  styleUrls: ['./day-modal.component.css'],
  moduleId: module.id
})
export class DayModalComponent implements OnInit {
  loadedDate: Date;
  loadedStatus: 'complete' | 'fail' = null;


  // .JA. ModalDialogParams enables you to receive parameters sent by the component that is opening this dialog
  // and it also enables you to close the dialog and send data back to the caller.
  // more info at https://docs.nativescript.org/core-concepts/navigation#modal-view-navigation
  constructor(private modalParams: ModalDialogParams) {}

  ngOnInit() {
    const parsedParams = this.modalParams.context as {
      date: Date;
      status: DayStatus;
    };
    this.loadedDate = parsedParams.date;
    if (parsedParams.status === DayStatus.Completed) {
      this.loadedStatus = 'complete';
    } else if (parsedParams.status === DayStatus.Failed) {
      this.loadedStatus = 'fail';
    } else {
      this.loadedStatus = null;
    }
  }

  onHandleInput(action: DayStatus) {
    this.modalParams.closeCallback(action);
  }
}
