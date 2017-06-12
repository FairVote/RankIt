import { Action } from '@ngrx/store';

export const SET_ACTIVE_POLL = '[@widget/root] setActivePoll';

export class SetActivePollAction implements Action {
  public readonly type = SET_ACTIVE_POLL;

  constructor(public readonly payload: string) {}
}

export function activePollReducer(state: string | null = null, action: Action): string | null {
  switch (action.type) {
    case SET_ACTIVE_POLL:
      if (state != (action as SetActivePollAction).payload) {
        return (action as SetActivePollAction).payload || null;
      }
      return state;
    default:
      return state;
  }

}
