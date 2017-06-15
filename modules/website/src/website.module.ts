import { NgModule } from '@angular/core';
import { BrowserInfrastructureModule, RankitWidgetModule } from '@rankit/widget';

import { WebsiteRootComponent } from './root/website.root.component';
import { BrowserModule } from '@angular/platform-browser';
import { WebsiteRoutingModule } from './website.routing.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  imports: [
    BrowserModule,
    SharedModule,
    BrowserInfrastructureModule,
    RankitWidgetModule,

    WebsiteRoutingModule
  ],
  declarations: [ WebsiteRootComponent ],
  bootstrap: [ WebsiteRootComponent ]
})
export class RankitWebsiteModule {}
