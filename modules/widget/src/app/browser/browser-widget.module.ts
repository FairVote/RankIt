import { InjectionToken, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserInfrastructureModule, RankitRootRoutingModule, RankitWidgetModule } from '@rankit/widget';
import { BrowserRootComponent } from './browser-root.component';
import { environment } from '../environments/environment';
import { StoreModule } from '@ngrx/store';
import { SHOULD_INSTRUMENT, StoreDevtoolsModule } from '@ngrx/store-devtools';

const instrument: InjectionToken<boolean> = new InjectionToken('instrument');

@NgModule({
  imports: [
    BrowserModule.withServerTransition({ appId: environment.appId }),

    StoreModule.forRoot({}),
    BrowserInfrastructureModule,
    RankitWidgetModule,
    RankitRootRoutingModule,

    StoreDevtoolsModule.instrument({ maxAge: 100 }),


  ],
  declarations: [ BrowserRootComponent ],
  providers: [ { provide: SHOULD_INSTRUMENT, useValue: !environment.production } ],
  bootstrap: [ BrowserRootComponent ]
})
export class BrowserWidgetModule {
  constructor() {
    if (!environment.production) {
      console.info(`BrowserWidgetModule constructed.`)
    }
  }

}
