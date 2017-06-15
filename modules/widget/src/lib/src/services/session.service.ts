import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { getActivePoll, getActivePollId, getBallotState, WidgetState } from '../reducers/index';
import { Observable } from 'rxjs/Observable';
import { SetActivePollAction } from '../reducers/active-poll.reducer';
import { Poll } from '../models/poll';
import { BallotState } from '../ballot-page/ballot.state';

@Injectable()
export class SessionService {

  public readonly activePollId$: Observable<string>;

  constructor(private store: Store<WidgetState>) {
    this.activePollId$ = this.store.select(getActivePollId);

  }

  public setActivePoll(id: string) {
    this.store.dispatch(new SetActivePollAction(id));
  }

  public getActivePoll(): Observable<Poll> {
    return this.store.select(getActivePoll);
  }

  public getBallotState(): Observable<BallotState> {
    return this.store.select(getBallotState)
  }

}
