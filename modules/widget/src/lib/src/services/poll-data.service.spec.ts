import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { mockPoll } from '../models/fixtures';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/timer';
import 'rxjs/add/operator/map';
import { Store } from '@ngrx/store';
import { PollService } from './poll.service';
import { PollLoadedAction } from '../reducers/poll-data.reducer';
import { pollsEqual } from '../models/poll';
import { Datasource, DatasourceToken } from '../infrastructure';

const RESPONSE_DELAY = 1000;

describe('PollService', () => {
  const poll = mockPoll().poll;
  let datasource: Datasource | any;
  let store: Store<any> | any;
  let target: PollService;
  beforeEach(() => {
    jasmine.addCustomEqualityTester(pollLoadedActionEqualityTester);
    TestBed.configureTestingModule({
      providers: [
        PollService,
        {
          provide: Store,
          useValue: jasmine.createSpyObj('store', [ 'dispatch', 'select', 'subscribe' ])
        },
        {
          provide: DatasourceToken,
          useValue: jasmine.createSpyObj('datasource', [ 'object', 'list' ])
        }
      ]
    });

    datasource = TestBed.get(DatasourceToken);
    datasource.object.and.returnValue(Observable.timer(RESPONSE_DELAY).map(() => poll));
    store = TestBed.get(Store);
    target = TestBed.get(PollService);
  });

  it('should load the requested poll and then dispatch a POLL_LOADED event ', fakeAsync(() => {
    const expectedAction = new PollLoadedAction(poll);

    target.load(poll.id);

    expect(store.dispatch).toHaveBeenCalledTimes(0);

    tick(RESPONSE_DELAY);

    expect(store.dispatch).toHaveBeenCalledTimes(1);

    expect(store.dispatch).toHaveBeenCalledWith(expectedAction);
  }));


});

function pollLoadedActionEqualityTester(x: any, y: any) {
  return x.payload && y.payload && x.type == y.type && pollsEqual(x.payload, y.payload);
}
