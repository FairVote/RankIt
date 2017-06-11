export interface Vote {

  /**
   * unique identifier
   */
  id: string;

  /**
   * Ordered array of the choices ranked in this vote, each represented by it's mockId
   */
  choices: string[];

  /**
   * the mockId of the voter who timeCast the vote. Note: If the vote was timeCast privately, this value will be null
   */
  owner: string;

  /**
   * the time the vote was initially timeCast
   */
  timeCast: Date;
}

export function parseVote(it: Partial<Vote> | any): Vote {
  if (!it.id) {
    throw new Error(`Cannot parse vote without ID: ${JSON.stringify(it)}`);
  }
  return {
    id: it.id,
    choices: it.choices,
    owner: it.owner,
    timeCast: new Date(it.timeCast)
  }
}

export function votesEqual(x: Partial<Vote>, y: Partial<Vote>) {

  if (!x && !y) {
    return true;
  }

  if (!(x && y)) {
    return false
  }

  if (x.id !== y.id || x.timeCast.getTime() !== y.timeCast.getTime()) {
    return false;
  }

  if ((x.choices || []).join('_') !== (y.choices || []).join('_')) {
    return false;
  }

  return true;

}

export function mergeVotes(prev: Partial<Vote>, next: Partial<Vote>): Vote {
  return { ...parseVote(prev), ...parseVote(next) } as Vote; //why is this timeCast necessary?
}
