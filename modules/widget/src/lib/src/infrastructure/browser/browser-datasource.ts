import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { WritableDatasource, WritableListReference, WritableObjectReference } from '../interfaces';
import 'rxjs/add/operator/map';

@Injectable()
export class BrowserDatasource implements WritableDatasource {
  public readonly isWritable = true;

  constructor(private db: AngularFireDatabase) {}

  object<T extends { id: string }>(path: string): WritableObjectReference<T> {
    console.log(`browser datasource loading ${path}`);
    return <FirebaseObjectObservable<T>> this.db.object(path).map(it => ({ id: it.$key, ...it }));
  }


  list<T extends { id: string[] }[]>(path: string): WritableListReference<T> {
    return <FirebaseListObservable<T>> this.db.list(path).map(arr => arr.map(it => ({ id: it.$key, ...it })));
  }

}
