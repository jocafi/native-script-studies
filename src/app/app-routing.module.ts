import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";

import { ItemsComponent } from "./item/items.component";
import { ItemDetailComponent } from "./item/item-detail.component";
import { CurrentChallengeComponent } from '~/app/challenges/current-challenge/current-challenge.component';
import { StackComponent } from '~/app/layouts/stack/stack.component';
import { FlexboxComponent } from '~/app/layouts/flexbox/flexbox.component';
import { GridComponent } from '~/app/layouts/grid/grid.component';
import { AbsoluteComponent } from '~/app/layouts/absolute/absolute.component';
import { ChallengeEditComponent } from '~/app/challenges/challenge-edit/challenge-edit.component';

const routes: Routes = [
    { path: "", redirectTo: "/challenge", pathMatch: "full" },
    { path: "aboslute", component: AbsoluteComponent },
    { path: "grid", component: GridComponent },
    { path: "flexbox", component: FlexboxComponent },
    { path: "stack", component: StackComponent },
    { path: "challenge", component: ChallengeEditComponent },
    { path: "items", component: ItemsComponent },
    { path: "item/:id", component: ItemDetailComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
