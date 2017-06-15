import { NgModule } from '@angular/core';
import { AuthProviderToken, DatasourceToken } from '../tokens';
import { BrowserDatasource } from './browser-datasource';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../../../environments/environment';
import { BrowserAuthProvider } from './browser-auth-provider';

@NgModule({
  imports: [
    AngularFireModule.initializeApp(environment.firebaseConf),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  providers: [

    { provide: DatasourceToken, useClass: BrowserDatasource },
    { provide: AuthProviderToken, useClass: BrowserAuthProvider }

  ]
})
export class BrowserInfrastructureModule {
  constructor() {
    if (!environment.production) {
      console.info('BrowserInfrastructureModule constructed');
    }
  }
}
