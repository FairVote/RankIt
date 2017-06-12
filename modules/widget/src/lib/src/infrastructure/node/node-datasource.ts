import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Datasource } from '../interfaces';
import { Http } from '@angular/http';

import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';

@Injectable()
export class NodeDatasource implements Datasource {
  public readonly isWritable = false;

  constructor(private http: Http) {}

  private readonly API_URL = 'https://rcv-app.firebaseio.com';

  object<T>(path: string): Observable<T> {
    const parts = path.split('/');
    /*TODO evaluate how problematic this will be:
     it's going to append id fields to objects we don't expect to have IDs, but will ensure they're always there on
     objects we do expect to have them. (this is necessary because of inconsistency in firebase response type across
     REST and JS apis - we're trying to abstract that away here, but maybe its more trouble than its worth.
     */
    const id = parts[ parts.length - 1 ];

    console.log(`server datasource getting ${path}`);
    return this.http.get(`${this.API_URL}${path}.json`)
      .take(1)
      .map(it => it.json())
      .map(it => ({ ...it, id }));
  }

  list<T>(path: string): Observable<T[]> {
    console.log(`server datsource loading ${path}`);

    return this.http.get(`${this.API_URL}${path}.json`)
      .take(1)
      .map(it => it.json())
      .map(dict => Object.keys(dict).map(id => ({ ...dict[ id ], id })));

  }

}
