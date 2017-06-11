import { mockPoll } from './fixtures';
import { mergePolls, poll, pollsEqual } from './poll';

describe('models', () => {
  describe('Poll', () => {

    beforeEach(() => {

    });

    describe('poll()', () => {

      const data = {
        prompt: 'Some prompt',
        id: 'id_foo',
        security: 'anonymous',
        timeCreated: new Date(),
        timeEdited: new Date(),
        isPublic: false,
        timeClosed: null,
        options: [
          {
            id: 'id_option_1',
            text: 'option 1',
            color: 'foo',
          },
          {
            id: 'id_option_2',
            text: 'option 2',
            color: 'bar',
          },
          {
            id: 'id_option_3',
            text: 'option 3',
            color: 'baz',
          }
        ]
      };

      it('should return as expected give acceptable input', () => {
        let cted = poll(data);

        Object.keys(data).forEach(field => {
          if (field !== 'options') {
            expect(cted[ field ]).toEqual(data[ field ])
          }
        });
      });

      it('Should accept options as a dict and return it as an array', () => {
        let cted = poll({
          ...data,
          options: data.options.reduce((result, next) => ({ ...result, [next.id]: next }), {})
        });

        expect(pollsEqual(cted, poll(data))).toBe(true);

      });

    });


    describe('pollsEqual()', () => {
      it('should return true on unique references to objects with identical properties', () => {
        let poll = mockPoll().poll;

        expect(pollsEqual(poll, { ...poll })).toBe(true);

      });


      it('should return false when any two properties differ', () => {
        let poll = mockPoll().poll;

        expect(pollsEqual(poll, { ...poll, isPublic: !poll.isPublic }))
          .toBe(false, `Returned true when isPublic values were unequal`);
        expect(pollsEqual(poll, { ...poll, prompt: 'Some other prompt' }))
          .toBe(false, `Returned true when titles were unequal`);

        expect(pollsEqual(poll, {
          ...poll,
          options: poll.options.map((option, idx) => ({ ...option, text: `Some other text ${idx}` }))
        })).toBe(false, `Returned true but options are unequal!`)


      });


      it('should return true when the only difference is the ordering of options array', () => {
        let poll = mockPoll().poll;
        expect(pollsEqual(poll, { ...poll, options: poll.options.reverse() })).toBe(true);
      })

    });

    describe('mergePolls()', () => {

      it('should overwrite conflicting properties', () => {
        let pollX = mockPoll().poll;
        let expectedisPublic = !pollX.isPublic;
        let expectedPrompt = 'Some other prompt';
        expect(mergePolls(pollX, { ...pollX, isPublic: expectedisPublic }).isPublic).toBe(expectedisPublic)
        expect(mergePolls(pollX, { ...pollX, prompt: expectedPrompt }).prompt).toBe(expectedPrompt)

      })

    });


  });

});
