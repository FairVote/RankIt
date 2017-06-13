import { NgModule } from '@angular/core';
import { DatasourceToken } from '../tokens';
import { BrowserDatasource } from './browser-datasource';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../../../environments/environment';

@NgModule({
  imports: [
    AngularFireModule.initializeApp(environment.firebaseConf),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  providers: [

    { provide: DatasourceToken, useClass: BrowserDatasource },

  ]
})
export class BrowserInfrastructureModule {
  constructor() {
    if (!environment.production) {
      console.info('BrowserInfrastructureModule constructed');
    }
  }
}
