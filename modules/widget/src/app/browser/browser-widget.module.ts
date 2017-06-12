import { InjectionToken, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserInfrastructureModule, RankitRootRoutingModule, RankitWidgetModule } from '@rankit/widget';
import { BrowserRootComponent } from './browser-root.component';
import { environment } from '../environments/environment';

const instrument: InjectionToken<boolean> = new InjectionToken('instrument');

@NgModule({
  imports: [
    BrowserModule.withServerTransition({ appId: environment.appId }),
    BrowserInfrastructureModule,
    RankitWidgetModule,
    RankitRootRoutingModule
  ],
  declarations: [ BrowserRootComponent ],
  bootstrap: [ BrowserRootComponent ]
})
export class BrowserWidgetModule {
  constructor() {

    if (!environment.production) {
      console.info(`BrowserWidgetModule constructed.`)
    }
  }

}
