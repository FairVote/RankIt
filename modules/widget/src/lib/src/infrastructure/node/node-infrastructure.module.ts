import { NgModule } from '@angular/core';
import { NodeDatasource } from './node-datasource';
import { DatasourceToken } from '../tokens';
import { HttpModule } from '@angular/http';

@NgModule({
  imports: [ HttpModule ],
  providers: [
    { provide: DatasourceToken, useClass: NodeDatasource }
  ]
})
export class NodeInfrastructureModule {

  constructor() {
    console.log('Node infrastructure module constructed');
  }
}
