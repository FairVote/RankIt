import { Poll } from '../models/poll';
import { SessionUser } from '../models/user';
import { pollDataReducer } from './poll-data.reducer';
import { Action, createSelector, Selector } from '@ngrx/store';
import { activePollReducer } from './active-poll.reducer';

let _dontRemoveImports: Action;

export type DataState<T> = {
  ids: string[];
  entities: { [id: string]: T }
}

export interface WidgetState {
  session: {
    user: SessionUser,
    activePoll: string | null
  },
  data: {
    polls: DataState<Poll>
  },
}

export const sessionReducers = {
  activePoll: activePollReducer
};

export const dataReducers = {
  poll: pollDataReducer
};

const getSessionState = (state: WidgetState) => state.session;
const getDataState = (state: WidgetState) => state.data;


export const getActivePollId: Selector<WidgetState, string> =
  createSelector(getSessionState, (session) => session.activePoll);

