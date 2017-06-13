import { Injectable } from '@angular/core';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import { PollDataService } from './poll-data.service';
import { SET_ACTIVE_POLL } from '../reducers/active-poll.reducer';
import { PollLoadedAction } from '../reducers/poll-data.reducer';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

@Injectable()
export class DataEffects {

  @Effect()
  loadActivePollEffect: Observable<PollLoadedAction> = this.actions$.ofType(SET_ACTIVE_POLL)
    .map(toPayload)
    .distinctUntilChanged()
    .do(id => console.log(`loadActivePollEffect detected change to ${id}`))
    .flatMap(pollId => this.pollDataSvc.load(pollId))
    .map(poll => new PollLoadedAction(poll));

  constructor(private actions$: Actions, private pollDataSvc: PollDataService) {}


}
