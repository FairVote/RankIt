import { NgModule } from '@angular/core';
import { BrowserInfrastructureModule, PlatformToken, RankitWidgetModule } from '@rankit/widget';

import { WebsiteRootComponent } from './root/website.root.component';
import { BrowserModule } from '@angular/platform-browser';
import { WebsiteRoutingModule } from './website.routing.module';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    BrowserInfrastructureModule,
    RankitWidgetModule,

    WebsiteRoutingModule
  ],
  declarations: [ WebsiteRootComponent ],
  bootstrap: [ WebsiteRootComponent ],
  providers: [
    {
      provide: PlatformToken,
      useValue: 'BROWSER'
    }
  ]
})
export class RankitWebsiteModule {}
