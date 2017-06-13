import { Inject, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BallotModule } from './ballot-page/ballot.module';
import { DatasourceToken } from './infrastructure/tokens';
import { Datasource } from './infrastructure/interfaces';
import { SessionService } from './services/session.service';
import { StoreModule } from '@ngrx/store';
import { dataReducers, sessionReducers } from './reducers/index';
import { environment } from '../environments/environment';

@NgModule({
  imports: [
    CommonModule,

    StoreModule.forFeature('data', dataReducers),
    StoreModule.forFeature('session', sessionReducers),

    BallotModule

  ],
  providers: [ SessionService ]
})
export class RankitWidgetModule {

  constructor(@Optional() @SkipSelf() extantWidgetModule: RankitWidgetModule, @Optional() @Inject(DatasourceToken) datasource: Datasource) {

    if (!!extantWidgetModule) {
      throw new Error(`RankitWidgetModule instantiated multiple times: Please import it ONLY in your root module`);
    }

    if (!datasource) {
      throw new Error(`RankitWidgetModule instantiated without a datasource in the DI container, please provide one.`)
    }


    if (!environment.production) {
      console.info(`RankitWidgetModule constructed.`);
    }

  }
}
