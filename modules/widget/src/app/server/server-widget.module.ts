import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {
  NODE,
  NodeInfrastructureModule,
  PlatformToken,
  RankitRootRoutingModule,
  RankitWidgetModule
} from '@rankit/widget';
import { ServerRootComponent } from './server-root.component';
import { ServerModule } from '@angular/platform-server';
import { environment } from '../environments/environment';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    ServerModule,
    NoopAnimationsModule,
    BrowserModule.withServerTransition({ appId: environment.appId }),
    NodeInfrastructureModule,
    RankitWidgetModule,
    RankitRootRoutingModule
  ],
  declarations: [ ServerRootComponent ],
  bootstrap: [ ServerRootComponent ],
  providers: [
    {
      provide: PlatformToken,
      useValue: NODE
    }
  ]
})
export class ServerWidgetModule {}
