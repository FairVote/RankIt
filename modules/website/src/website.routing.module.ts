import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RANKIT_ROUTES } from '@rankit/widget';

export const WEBSITE_ROUTES = [
  {
    path: 'poll',
    children: RANKIT_ROUTES
  }
];


@NgModule({
  imports: [ RouterModule.forRoot(WEBSITE_ROUTES) ],
  exports: [ RouterModule ]
})
export class WebsiteRoutingModule {

}
