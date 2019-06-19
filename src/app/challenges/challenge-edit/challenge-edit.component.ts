import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PageRoute } from 'nativescript-angular/router';

@Component({
  selector: 'ns-challenge-edit',
  templateUrl: './challenge-edit.component.html',
  styleUrls: ['./challenge-edit.component.css'],
  moduleId: module.id
})
export class ChallengeEditComponent implements OnInit {
  isCreating = true;

  constructor(
    private activatedRoute: ActivatedRoute,
    private pageRoute: PageRoute
  ) {}

  ngOnInit() {
    // .JA. NativeScript caches the paramMap for transition between pages (pop/push on the page stack),
    //  therefore it is needed to subscribe the ActivatedRoute object directly.

    // this.activatedRoute.paramMap.subscribe(paramMap => {
    //   console.log(paramMap.get('mode'));
    // });

    this.pageRoute.activatedRoute.subscribe(activatedRoute => {
      activatedRoute.paramMap.subscribe(paramMap => {
        if (!paramMap.has('mode')) {
          this.isCreating = true;
        } else {
          this.isCreating = paramMap.get('mode') !== 'edit';
        }
      });
    });
  }
}
