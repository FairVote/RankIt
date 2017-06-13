import { Inject, Injectable } from '@angular/core';
import { Datasource } from '../infrastructure/interfaces';
import { DatasourceToken } from '../infrastructure/tokens';
import { Observable } from 'rxjs/Observable';
import { Poll, poll, pollsEqual } from '../models/poll';
import { environment } from '../../environments/environment';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/reduce';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/scan';

@Injectable()
export class PollDataService {

  constructor(@Inject(DatasourceToken) private db: Datasource) {

  }


  public load(id: string): Observable<Poll> {
    if (!environment.production) {
      console.log(`PollService: loading: ${id}`);
    }

    return this.db.object<Poll>(`/poll/${id}`)
      .scan((curr, next) => {
        if (!curr || !pollsEqual(curr, next)) {
          return next;

        }
        return curr;
      })
      .distinctUntilChanged()
      .map(data => poll(data));
  }

}
