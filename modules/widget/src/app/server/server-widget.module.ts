import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NodeInfrastructureModule, RankitRootRoutingModule, RankitWidgetModule } from '@rankit/widget';
import { ServerRootComponent } from './server-root.component';
import { ServerModule } from '@angular/platform-server';
import { environment } from '../environments/environment';
import { StoreModule } from '@ngrx/store';

@NgModule({
  imports: [
    ServerModule,
    BrowserModule.withServerTransition({ appId: environment.appId }),
    StoreModule.forRoot({}),
    NodeInfrastructureModule,
    RankitWidgetModule,
    RankitRootRoutingModule
  ],
  declarations: [ ServerRootComponent ],
  bootstrap: [ ServerRootComponent ]
})
export class ServerWidgetModule {}
