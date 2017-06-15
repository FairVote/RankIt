import { InjectionToken, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {
  BROWSER,
  BrowserInfrastructureModule,
  PlatformToken,
  RankitRootRoutingModule,
  RankitWidgetModule
} from '@rankit/widget';
import { BrowserRootComponent } from './browser-root.component';
import { environment } from '../environments/environment';
import { Store } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { Actions } from '@ngrx/effects';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const instrument: InjectionToken<boolean> = new InjectionToken('instrument');


/**
 * This import ensures that dragula is included in the browser bundle - it is not included in the
 */


@NgModule({
  imports: [
    BrowserModule.withServerTransition({ appId: environment.appId }),
    BrowserAnimationsModule,
    FlexLayoutModule,

    BrowserInfrastructureModule,
    RankitWidgetModule,
    RankitRootRoutingModule,

    StoreDevtoolsModule.instrumentOnlyWithExtension(),

  ],
  declarations: [ BrowserRootComponent ],
  bootstrap: [ BrowserRootComponent ],
  providers: [
    {
      provide: PlatformToken,
      useValue: BROWSER
    }
  ]
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
