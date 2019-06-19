import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterExtensions } from 'nativescript-angular/router';
import { Page } from 'tns-core-modules/ui/page';

@Component({
  selector: 'ns-challenge-tabs',
  templateUrl: './challenge-tabs.component.html',
  styleUrls: ['./challenge-tabs.component.css'],
  moduleId: module.id
})
export class ChallengeTabsComponent implements OnInit {
  constructor(
    private router: RouterExtensions,
    private active: ActivatedRoute,
    private page: Page
  ) {}

  ngOnInit() {
    // .JA. It informs to Angular load both outlets simultaneously at the begin.
    // Only one will be shown by the TabView component.
    // The outlets are defined in the file ./app/challenges/challenges-routing.module.ts
    //
    // the relativeTo means the start point to navigate. ActivatedRoute from Angular is used in this case. (see chapter 86 from the course)
    this.router.navigate(
      [
        {
          outlets: { currentChallenge: ['current-challenge'], today: ['today'] }
        }
      ],
      {
        relativeTo: this.active
      }
    );
    this.page.actionBarHidden = true;
  }
}
