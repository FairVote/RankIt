import { Action, Selector } from '@ngrx/store';
import { mergePolls, Poll, pollsEqual } from '../models/poll';
import { DataState } from './index';

export const POLL_LOADED = '[core.data.poll] pollLoaded';


export class PollLoadedAction implements Action {
  public readonly type: string = POLL_LOADED;

  constructor(public readonly payload: Poll) {}
}


export function pollDataReducer(state: DataState<Poll> = { ids: [], entities: {} }, action: Action): DataState<Poll> {
  switch (action.type) {
    case POLL_LOADED:
      let poll = (action as PollLoadedAction).payload;

      if (state.ids.indexOf(poll.id) >= 0) {
        //if a poll with this id already exists in the current state:
        if (pollsEqual(state.entities[ poll.id ], poll)) {
          //and there are no changes: return the same object reference to avoid unnecessary redraws
          return state;
        } else {
          //and the data is different: update the entity data, ids remain unchanged
          return {
            ids: state.ids,
            entities: { ...state.entities, [poll.id]: mergePolls(state.entities[ poll.id ], poll) }
          }
        }
      } else {
        //if no poll with this id exists in the current state:
        return {
          ids: [ ...state.ids, poll.id ], //add it's id
          entities: { ...state.entities, [poll.id]: poll } //add it to entities
        }
      }

    default:
      return state;
  }
}


export const getIds: Selector<DataState<Poll>, string[]> = (state: DataState<Poll>) => state && state.ids || [];

export const getEntities: Selector<DataState<Poll>, { [id: string]: Poll }> = (state: DataState<Poll>) => state && state.entities || {};
