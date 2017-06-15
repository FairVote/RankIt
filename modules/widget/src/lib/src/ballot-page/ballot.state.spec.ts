import { ADD_TO_BALLOT, AddToBallotAction, ballotReducer, RemoveFromBallotAction, reorder } from './ballot.state';

describe('Ballot State', () => {

  const EMPTY_STATE = { selections: [] };

  describe('reorder function', () => {
    const initial = [ 'first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh' ];

    it('should return expected result when reordering an element upward', () => {
      let result = reorder(initial, 4, 1);
      expect(result).toEqual([ 'first', 'fifth', 'second', 'third', 'fourth', 'sixth', 'seventh' ]);
    });


    it('should return expected result when reordering an element downward', () => {
      let result = reorder(initial, 2, 5);
      expect(result).toEqual([ 'first', 'second', 'fourth', 'fifth', 'sixth', 'third', 'seventh' ]);
    })
  });

  describe('ADD_TO_BALLOT', () => {

    it('should add to index 0 of an intitially empty ballot', () => {
      const addedId = 'foo';
      let result = ballotReducer(EMPTY_STATE, new AddToBallotAction(addedId));
      expect(result.selections.length).toEqual(1);
      expect(result.selections[ 0 ]).toEqual(addedId);
    });

    it('should add to the end of a nonempty ballot', () => {
      let extantSelections = [ 'foo', 'bar', 'baz' ];
      let newSelection = 'foobarbaz';
      let result = ballotReducer({ selections: extantSelections }, new AddToBallotAction(newSelection));
      expect(result.selections.length).toEqual(extantSelections.length + 1);
      for (let i = 0; i < result.selections.length; i++) {
        if (i == result.selections.length - 1) {
          expect(result.selections[ i ]).toEqual(newSelection);
        } else {
          expect(result.selections[ i ]).toEqual(extantSelections[ i ]);
        }
      }
    });

  });

  describe('REMOVE_FROM_BALLOT', () => {
    it('should work as expected ', () => {
      let extantSelections = [ 'foo', 'bar', 'baz', 'foobaz' ];
      let result = ballotReducer({ selections: extantSelections }, new RemoveFromBallotAction('bar'));
      expect(result.selections).toEqual([ 'foo', 'baz', 'foobaz' ]);
      result = ballotReducer({ selections: result.selections }, new RemoveFromBallotAction('baz'));
      expect(result.selections).toEqual([ 'foo', 'foobaz' ]);
      result = ballotReducer({ selections: result.selections }, new RemoveFromBallotAction('foo'));
      expect(result.selections).toEqual([ 'foobaz' ]);
      result = ballotReducer({ selections: result.selections }, new RemoveFromBallotAction('foobaz'));
      expect(result.selections).toEqual([]);
    })
  });


});
