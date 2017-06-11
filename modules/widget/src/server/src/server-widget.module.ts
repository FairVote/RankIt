import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RankitCoreModule, RankitRootRoutingModule } from '@rankit/core';
import { ServerRootComponent } from './server-root.component';
import { environment } from '../environments/environment';
import { ServerModule } from '@angular/platform-server';

@NgModule({
  imports: [
    ServerModule,
    BrowserModule.withServerTransition({ appId: environment.appId }),
    RankitCoreModule,
    RankitRootRoutingModule
  ],
  declarations: [ ServerRootComponent ],
  bootstrap: [ ServerRootComponent ]
})
export class ServerWidgetModule {}
