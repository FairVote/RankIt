import { InjectionToken, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserInfrastructureModule, RankitRootRoutingModule, RankitWidgetModule } from '@rankit/widget';
import { BrowserRootComponent } from './browser-root.component';
import { environment } from '../environments/environment';
import { Store } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { Actions } from '@ngrx/effects';

const instrument: InjectionToken<boolean> = new InjectionToken('instrument');

@NgModule({
  imports: [
    BrowserModule.withServerTransition({ appId: environment.appId }),

    BrowserInfrastructureModule,
    RankitWidgetModule,
    RankitRootRoutingModule,

    StoreDevtoolsModule.instrumentOnlyWithExtension(),

  ],
  declarations: [ BrowserRootComponent ],
  bootstrap: [ BrowserRootComponent ]
})
export class BrowserWidgetModule {
  constructor(private store: Store<any>, private actions$: Actions) {
    if (!environment.production) {
      console.info(`BrowserWidgetModule constructed.`);

      this.store.subscribe(state => {
        console.info(`--- state change --- `);
        console.info(state);
      });

      this.actions$.subscribe(action => {
        console.info(`--- action --- `);
        console.info(action);
      })


    }
  }

}
