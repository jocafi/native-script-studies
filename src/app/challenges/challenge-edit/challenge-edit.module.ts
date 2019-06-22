import { NgModule } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { NativeScriptRouterModule } from 'nativescript-angular/router';

import { ChallengeEditComponent } from './challenge-edit.component';
import { SharedModule } from '~/app/shared/shared.module';
import { NativeScriptFormsModule } from 'nativescript-angular';

@NgModule({
  declarations: [ChallengeEditComponent],
  imports: [
    NativeScriptCommonModule,
    NativeScriptFormsModule,
    // .JA. The module NativeScriptRouterModule must be imported twice, if any component is using routing services / classes
    // because the ".forChild" does not import them.
    // NativeScriptRouterModule,
    NativeScriptRouterModule.forChild([
      { path: '', component: ChallengeEditComponent }
    ]),
    SharedModule
  ]
})
export class ChallengeEditModule {
}
