import { Poll } from '../models/poll';
import { SessionUser } from '../models/user';
import { pollDataReducer } from './poll-data.reducer';
import { Action, ActionReducer } from '@ngrx/store';
import { activePollReducer } from './active-poll.reducer';
import { createSelector, Selector } from 'reselect';


let _dontRemoveImports: Action | ActionReducer<any>;
/** TODO reimplement this way once ngrx@4.0 is stable

 `
export interface WidgetState {
  session: {
    user: SessionUser,
    activePoll: string | null
  },
  data: {
    poll: DataState<Poll>
  },
}


 export const dataReducers = {
  poll: pollDataReducer
};

 export const reducers = {
  data: combineReducers({
    poll: pollDataReducer
  }),
  session: combineReducers({
    activePoll: activePollReducer
  })
};
 */

export type DataState<T> = {
  ids: string[];
  entities: { [id: string]: T }
}

export interface WidgetState {
  user: SessionUser,
  activePoll: string | null,
  poll: DataState<Poll>

}

export const sessionReducers = {
  activePoll: activePollReducer
};

export const dataReducers = {
  poll: pollDataReducer
};

export const reducers = {
  activePoll: activePollReducer,
  poll: pollDataReducer
};


export const getActivePollId: Selector<WidgetState, string> = (state: WidgetState) => state.activePoll;

const getPollDataState: Selector<WidgetState, DataState<Poll>> = (state: WidgetState) => state.poll;

const getPolls: Selector<WidgetState, { [id: string]: Poll }> = createSelector(getPollDataState, (state) => state.entities);

export const getActivePoll = createSelector(getActivePollId, getPolls, (id, polls) => {
  if (!id || !polls[ id ]) {
    return undefined;
  }
  return polls[ id ];
});
