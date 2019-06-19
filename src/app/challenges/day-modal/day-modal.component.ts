import { Component, OnInit } from '@angular/core';
import { ModalDialogParams } from 'nativescript-angular/modal-dialog';

@Component({
  selector: 'ns-day-modal',
  templateUrl: './day-modal.component.html',
  styleUrls: ['./day-modal.component.css'],
  moduleId: module.id
})
export class DayModalComponent implements OnInit {
  loadedDate: Date;

  // .JA. ModalDialogParams enables you to receive parameters sent by the component that is opening this dialog
  // and it also enables you to close the dialog and send data back to the caller.
  // more info at https://docs.nativescript.org/core-concepts/navigation#modal-view-navigation
  constructor(private modalParams: ModalDialogParams) {}

  ngOnInit() {
    this.loadedDate = (this.modalParams.context as { date: Date }).date;
  }

  onHandleInput(action: string) {
    this.modalParams.closeCallback(action);
  }
}
