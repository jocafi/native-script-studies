import { NgModule } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';

import { ChallengesRoutingModule } from './challenges-routing.module';
import { ChallengeTabsComponent } from './challenge-tabs/challenge-tabs.component';
import { CurrentChallengeComponent } from './current-challenge/current-challenge.component';
import { TodayComponent } from './today/today.component';
import { SharedModule } from '../shared/shared.module';
import { ChallengeActionsModule } from '~/app/challenges/challenge-actions/challenge-actions.module';

@NgModule({
  declarations: [
    ChallengeTabsComponent,
    CurrentChallengeComponent,
    TodayComponent
  ],
  imports: [NativeScriptCommonModule, ChallengesRoutingModule, SharedModule, ChallengeActionsModule]
})
export class ChallengesModule {
}
