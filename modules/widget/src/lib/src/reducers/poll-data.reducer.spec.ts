import { pollDataReducer, PollLoadedAction } from './poll-data.reducer';
import { mockPoll } from '../models/fixtures';
import { Poll, pollsEqual } from '../models/poll';

describe('reducers', () => {

  describe('Poll Reducer', () => {

    it('should add a nonexistent poll', () => {

      let poll = mockPoll().poll;

      let result = pollDataReducer(EMPTY_STATE, new PollLoadedAction(poll));

      expect(result.ids.length).toEqual(1);
      expect(result.ids[ 0 ]).toEqual(poll.id);
      expect(Object.keys(result.entities).length).toEqual(1);
      expect(Object.keys(result.entities)[ 0 ]).toEqual(poll.id);
      expect(pollsEqual(poll, result.entities[ poll.id ])).toBeTruthy();
    });


    it('should update an existing poll when given different data', () => {
      let poll: Poll = mockPoll().poll;

      let initial = pollDataReducer(EMPTY_STATE, new PollLoadedAction(poll));

      const NEW_PROMPT = 'Something else';

      let state = pollDataReducer(initial, new PollLoadedAction({ ...poll, prompt: NEW_PROMPT } as Poll));

      expect(state.ids.length).toEqual(1);
      expect(Object.keys(state.entities).length).toEqual(1);
      expect(state.entities[ poll.id ].prompt).toEqual(NEW_PROMPT);

    })


  });
});

const EMPTY_STATE = {
  ids: [],
  entities: {}
};

