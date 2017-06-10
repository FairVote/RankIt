import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

export const RANKIT_ROUTES = [];


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

