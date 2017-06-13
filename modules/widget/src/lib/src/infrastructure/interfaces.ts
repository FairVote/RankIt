import { Observable } from 'rxjs/Observable';
import { Operator } from 'rxjs/Operator';
import 'rxjs/add/observable/of';

export interface Datasource {
  readonly isWritable: boolean;

  object<T>(path: string): Observable<T>;

  list<T>(path: string): Observable<T[]>;
}
/**
 * Annoyingly, firebase exports its own firebase.Promise interface, which is incompatible with the standard ES6 definition.
 * We want to hide the use of firebase/angularfire as an implementation detail behind this interface, but also want to
 * be able to return raw ObjectObservables/ListObservables from angularfire2 in our browser implementation without having
 * to wrap them. This feels like the least dirty option at the moment.
 */
export interface Promiselike<T> {
  catch(onReject?: (a: Error) => any): any;

  then(onResolve?: (a: T) => any, onReject?: (a: Error) => any): Promiselike<any>;
}

export interface WritableObjectReference<T> extends Observable<T> {
  set(value: any): Promiselike<void>;

  update(value: Object): Promiselike<void>;

  remove(): Promiselike<void>;
}

export interface WritableListReference<T> extends Observable<T> {
  lift<T, R>(operator: Operator<T, R>): Observable<R>;

  push(val: any): Promiselike<string>;

  update(path: string, value: Object): Promiselike<void>;

  remove(path?: string): Promiselike<void>;
}

export interface WritableDatasource extends Datasource {
  object<T>(path: string): WritableObjectReference<T>;

  list<T>(path: string): WritableListReference<T>;
}

