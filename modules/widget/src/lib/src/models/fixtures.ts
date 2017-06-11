import * as Faker from 'faker';
import { random, shuffle } from 'lodash';
import { Vote } from './vote';
import { Poll, PollOption } from './poll';


let lastId = 0;

export function mockId(type?: string): string {
  return `mock_${type || 'mockId'}_${++lastId}`;
}

const COLORS = [
  '#5C6BC0', '#EF5350', '#66BB6A', '#FFB74D', '#7E57C2', '#8D6E63',
  '#F06292', '#26C6DA', '#9CCC65', '#BDBDBD', '#5C6BC0'
];
let lastColorReturned = -1;

function color(): string {
  return COLORS[ ++lastColorReturned % COLORS.length ];
}

export function mockVoteWithChoices(choices: string[]): Vote {
  return {
    id: mockId('vote'),
    owner: mockId('user'),
    choices: choices,
    timeCast: new Date()
  }
}

export function mockVote(availableChoices: string[]): Vote {
  let numChoices = random(1, availableChoices.length),
    shuffled = shuffle(availableChoices);
  return {
    id: mockId('vote'),
    owner: mockId('user'),
    choices: shuffled.slice(0, numChoices),
    timeCast: new Date()
  }
}

export function mockPollOption(): PollOption {
  return {
    id: mockId(),
    text: `${Faker.name.firstName()} ${Faker.name.lastName()}`,
    color: color()
  };
}

export function mockPoll(): { poll: Poll, votes: Vote[] } {

  let numOptions = random(4, 8),
    options: PollOption[] = [];

  for (let i = 0; i < numOptions; i++) {
    options[ i ] = mockPollOption();
  }

  let optionIds = options.map(opt => opt.id);
  let numVotes = random(150, 500),
    votes: Vote[] = [];
  for (let i = 0; i < numVotes; i++) {
    votes[ i ] = mockVote(optionIds);
  }

  return {
    poll: {
      prompt: `Who should ${Faker.lorem.sentence().toLowerCase().slice(0, -1)}`,
      id: mockId('poll'),
      options: options,
      security: 'unverified',
      isPublic: true,
      timeCreated: new Date(Date.now()),
      timeEdited: new Date(Date.now()),
      timeClosed: null,
      owner: mockId('user'),
    },
    votes
  }

}
