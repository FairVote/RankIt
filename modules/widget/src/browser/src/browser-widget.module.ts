import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RankitCoreModule, RankitRootRoutingModule } from '@rankit/core';
import { BrowserRootComponent } from './browser-root.component';
import { environment } from '../environments/environment';

@NgModule({
  imports: [
    BrowserModule.withServerTransition({ appId: environment.appId }),
    RankitCoreModule,
    RankitRootRoutingModule
  ],
  declarations: [ BrowserRootComponent ],
  bootstrap: [ BrowserRootComponent ]
})
export class BrowserWidgetModule {}
