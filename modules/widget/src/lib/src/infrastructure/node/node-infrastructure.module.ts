import { NgModule } from '@angular/core';
import { NodeDatasource } from './node-datasource';
import { AuthProviderToken, DatasourceToken } from '../tokens';
import { HttpModule } from '@angular/http';
import { NoopAuthProvider } from './noop-auth.provider';

@NgModule({
  imports: [ HttpModule ],
  providers: [
    { provide: DatasourceToken, useClass: NodeDatasource },
    { provide: AuthProviderToken, useClass: NoopAuthProvider }

  ]
})
export class NodeInfrastructureModule {

  constructor() {
    console.log('Node infrastructure module constructed');
  }
}
