import { Component, ViewContainerRef } from '@angular/core';
import { ModalDialogService } from 'nativescript-angular/modal-dialog';

import { DayModalComponent } from '../day-modal/day-modal.component';
import { UIService } from '~/app/shared/ui.service';
import { RouterExtensions } from 'nativescript-angular';

@Component({
  selector: 'ns-current-challenge',
  templateUrl: './current-challenge.component.html',
  styleUrls: ['./current-challenge.component.css'],
  moduleId: module.id
})
export class CurrentChallengeComponent {
  constructor(
    private modalDialog: ModalDialogService,
    private vcRef: ViewContainerRef,
    private uiService: UIService,
    private router: RouterExtensions
  ) {}

  onChangeStatus() {
    // .JA. to open a modal dialog, you need to specify the reference of the parent container (the page that is opening the dialog) = this.vcRef.
    // the context attribute allows you to pass data to the modal dialog
    // more info at https://docs.nativescript.org/core-concepts/navigation#modal-view-navigation
    this.modalDialog
      .showModal(DayModalComponent, {
        fullscreen: true,
        viewContainerRef: this.uiService.getRootVCRef()
          ? this.uiService.getRootVCRef()
          : this.vcRef,
        context: { date: new Date() }
      })
      .then((action: string) => {
        // .JA. here is the data that was sent by the modal dialog when the user closed it
        console.log(action);
      });
  }

  navigateToEdit() {
    this.router.navigate(['/challenges/new']);
  }
}
