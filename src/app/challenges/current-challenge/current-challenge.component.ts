import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ModalDialogService } from 'nativescript-angular/modal-dialog';

import { DayModalComponent } from '../day-modal/day-modal.component';
import { UIService } from '~/app/shared/ui.service';
import { RouterExtensions } from 'nativescript-angular';
import { ChallengeService } from '~/app/challenges/challenge.service';
import { Subscription } from 'rxjs';
import { Challenge } from '~/app/challenges/challenge.model';
import { Day, DayStatus } from '~/app/challenges/day.model';

@Component({
  selector: 'ns-current-challenge',
  templateUrl: './current-challenge.component.html',
  styleUrls: [
    './_current-challenge.component.common.scss',
    './current-challenge.component.scss'
  ],
  moduleId: module.id
})
export class CurrentChallengeComponent implements OnInit {

  weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  days: { dayInMonth: number; dayInWeek: number }[] = [];
  currentChallenge: Challenge;
  private curChallengeSub: Subscription;


  constructor(
      private modalDialog: ModalDialogService,
      private vcRef: ViewContainerRef,
      private uiService: UIService,
      private router: RouterExtensions,
      private challengeService: ChallengeService
  ) {
  }

  ngOnInit() {
    this.curChallengeSub = this.challengeService.currentChallenge.subscribe(
        challenge => {
          this.currentChallenge = challenge;
        }
    );
  }

  getIsSettable(dayInMonth: number) {
    return dayInMonth <= new Date().getDate();
  }

  getRow(index: number, day: { dayInMonth: number; dayInWeek: number }) {
    const startRow = 1;
    const weekRow = Math.floor(index / 7);
    const firstWeekDayOfMonth = new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        1
    ).getDay();
    const irregularRow = day.dayInWeek < firstWeekDayOfMonth ? 1 : 0;

    return startRow + weekRow + irregularRow;
  }

  onChangeStatus(day: Day) {
    if (!this.getIsSettable(day.dayInMonth)) {
      return;
    }
    // .JA. to open a modal dialog, you need to specify the reference of the parent container (the page that is opening the dialog) = this.vcRef.
    // the context attribute allows you to pass data to the modal dialog
    // more info at https://docs.nativescript.org/core-concepts/navigation#modal-view-navigation
    this.modalDialog
        .showModal(DayModalComponent, {
          fullscreen: true,
          viewContainerRef: this.uiService.getRootVCRef()
              ? this.uiService.getRootVCRef()
              : this.vcRef,
          context: { date: day.date, status: day.status }
        })
        // .JA. here is the data that was sent by the modal dialog when the user closed it
        .then((status: DayStatus) => {
          if (status === DayStatus.Open) {
            return;
          }
          this.challengeService.updateDayStatus(day.dayInMonth, status);
        });
  }

  navigateToEdit() {
    this.router.navigate(['/challenges/new']);
  }

  ngOnDestroy() {
    if (this.curChallengeSub) {
      this.curChallengeSub.unsubscribe();
    }
  }
}
