import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BallotViewComponent } from './ballot/ballot-view/ballot-view.component';

export const RANKIT_ROUTES = [
  {
    path: ':pollId',
    component: BallotViewComponent
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

