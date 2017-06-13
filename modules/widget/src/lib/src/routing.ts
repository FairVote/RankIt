import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BallotPageComponent } from './ballot-page/ballot-page.component';

export const RANKIT_ROUTES = [
  {
    path: ':pollId',
    component: BallotPageComponent
  }
];


@NgModule({
  imports: [ RouterModule.forRoot(RANKIT_ROUTES) ],
  exports: [ RouterModule ]
})
export class RankitRootRoutingModule {}


@NgModule({
  imports: [ RouterModule.forChild(RANKIT_ROUTES) ],
  exports: [ RouterModule ]
})
export class RankitChildRoutingModule {}

