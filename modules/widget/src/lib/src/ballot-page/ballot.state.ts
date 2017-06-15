import { Action } from '@ngrx/store';

export interface BallotState {
  selections: string[];
}

export const ADD_TO_BALLOT = '[Ballot] addToBallot';
export const REMOVE_FROM_BALLOT = '[Ballot] removeFromBallot';
export const REORDER_BALLOT = '[Ballot] reorderBallot';

export class AddToBallotAction implements Action {
  public readonly type = ADD_TO_BALLOT;
  public readonly payload: { id: string, atIndex?: number };

  constructor(id: string, atIndex?: number) {
    this.payload = { id, atIndex };
  }
}

export class ReorderBallotAction implements Action {
  public readonly type = REORDER_BALLOT;
  public readonly payload: { from: number, to: number };

  constructor(from: number, to: number) {
    this.payload = { from, to };
  }
}


export class RemoveFromBallotAction implements Action {
  public readonly type = REMOVE_FROM_BALLOT;

  constructor(public readonly payload: string) {
  }
}


export function ballotReducer(state: BallotState = { selections: [] }, action: Action): BallotState {
  let selections: string[];
  switch (action.type) {
    case ADD_TO_BALLOT:
      let addAction: AddToBallotAction = action as AddToBallotAction,
        afterAdding: string[];
      if (!!addAction.payload.atIndex) {
        afterAdding = state.selections.splice(addAction.payload.atIndex, 0, addAction.payload.id);
      } else {
        afterAdding = [ ...state.selections, addAction.payload.id ]
      }

      return {
        selections: afterAdding
      };

    case REORDER_BALLOT:
      let reorderAction: ReorderBallotAction = action as ReorderBallotAction;
      selections = reorder(state.selections, reorderAction.payload.from, reorderAction.payload.to);
      return {
        selections
      };
    default:
      return state;

    case REMOVE_FROM_BALLOT:
      let removeAction: RemoveFromBallotAction = action as RemoveFromBallotAction;
      selections = [ ...state.selections ];
      selections.splice(selections.indexOf(removeAction.payload), 1);
      return {
        selections
      }
  }
}

export function reorder<T>(current: T[], fromIndex: number, toIndex: number): T[] {
  let result = [ ...current ];
  result.splice(fromIndex, 1);
  result.splice(toIndex, 0, current[ fromIndex ]);

  return result;
}
