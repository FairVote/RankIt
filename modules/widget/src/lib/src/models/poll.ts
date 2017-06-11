/**
 * TODO document what each type specifies
 */
export type SecurityLevel = 'anonymous' | 'unverified' | 'verified' | 'private';


/**
 * a candidate choice - one of the options being ranked - in a poll
 */
export interface PollOption {

  id: string;

  /**
   * the name or brief definition of this option
   */
  text: string;

  /**
   * the color of the swatch used to represent this option in the UI
   */
  color: string;

  /**
   * optionally, an image can be used in place of the color
   */
  image?: string;
}


export interface Poll {

  /**
   * unique identifier
   */
  id: string;

  /**
   * the question the poll is asking
   */
  prompt: string;

  /**
   * the options being ranked in this poll
   */
  options: PollOption[];

  /**
   * the poll's security setting
   */
  security: SecurityLevel;

  /**
   * whether the poll should be shown on the homepage feed
   */
  isPublic: boolean;

  /**
   * when the poll was created (for sorting purposes)
   */
  timeCreated: Date;

  /**
   * when the poll was timeCreated (for sorting purposes)
   */
  timeEdited: Date;

  /**
   * the time at which the poll was or will be closed, or null if set to remain open indefinitely
   */
  timeClosed: Date | null;

  /**
   * the mockId of the auth who timeCreated this poll
   */
  owner: string;
}


export function poll(data: Partial<Poll> | any): Poll {

  function isPollOption(it: any) {
    return (!!it.text && !!it.color);
  }

  if (!data.id) {
    throw new Error(`Cannot parse poll: No ID present on ${JSON.stringify(data)}`);
  }

  let options;
  if (!data.options) {
    throw new Error(`Missing mandatory property options on Poll: ${JSON.stringify(data)}`);
  }
  if (!(data.options instanceof Array)) {
    let keys = Object.keys(data.options);
    if (!isPollOption(data.options[ keys[ 0 ] ])) {
      throw new Error(`Invalid value for poll.options: ${JSON.stringify(data.options)}`);
    }
    options = keys.map(id => ({ id, ...data.options[ id ] }));
  } else {
    options = data.options;
  }

  return {
    id: data.id,
    options,
    prompt: data.prompt,
    security: data.security,
    isPublic: data.isPublic,
    timeCreated: new Date(data.timeCreated),
    timeEdited: new Date(data.timeEdited),
    timeClosed: data.closed && new Date(data.closed) || null,
    owner: data.owner
  }
}

function pollOptionsEqual(x: PollOption, y: PollOption) {
  if (!x && !y) {
    //if both undefined, consider true
    return true;
  } else if (!(x && y)) {
    //if only one is undefined, consider false
    return false;
  }
  if (x.id !== y.id || x.text !== y.text || x.color !== y.color || x.image !== y.image) {
    return false;
  }
  return true;
}


export function pollsEqual(x: Poll, y: Poll) {
  if (
    x.id !== y.id ||
    x.prompt !== y.prompt ||
    x.isPublic !== y.isPublic ||
    x.security !== y.security ||
    x.timeClosed !== y.timeClosed ||
    x.timeCreated.getTime() !== y.timeCreated.getTime() ||
    x.timeEdited.getTime() !== y.timeEdited.getTime()
  ) { return false; }

  if (x.options.length !== y.options.length) {
    return false;
  }

  // /dont care about order
  let yMap = y.options.reduce((result, opt) => ({ ...result, [opt.id]: opt }), {});

  for (let i = 0; i < x.options.length; i++) {
    if (!pollOptionsEqual(x.options[ i ], yMap[ x.options[ i ].id ])) {
      return false;
    }
  }

  return true;

}

export function mergePolls(prev: Partial<Poll>, next: Partial<Poll>) {
  return { ...poll(prev), ...poll(next) };
}
