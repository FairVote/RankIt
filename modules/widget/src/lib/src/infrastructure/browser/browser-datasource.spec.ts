import { async, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { AngularFireDatabase } from 'angularfire2/database';
import { BrowserDatasource } from './browser-datasource';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/timer';
import { mockId, mockPoll } from '@rankit/widget';

const RESPONSE_DELAY = 1000;

describe('core', () => {
  describe('infrastructure', () => {

    describe('BrowserDatasource', () => {
      const polls = [ 1, 2, 3, 4, 5 ].map(() => mockPoll().poll);
      const poll = mockPoll().poll;

      let db: AngularFireDatabase;
      let target: BrowserDatasource;

      beforeEach(async(() => {
        TestBed.configureTestingModule({
          providers: [
            { provide: AngularFireDatabase, useValue: mockNgFireDatabase({ object: poll, list: polls }) },
            BrowserDatasource
          ]
        });

        db = TestBed.get(AngularFireDatabase);
        target = TestBed.get(BrowserDatasource);

      }));

      describe('object()', () => {

        it('should query the database once for the requested value', fakeAsync(() => {

          let results: any[] = [];

          target.object(`/poll/${poll.id}`).subscribe(val => results.push(val));

          tick(RESPONSE_DELAY / 2);
          expect(results.length).toEqual(0);
          tick(RESPONSE_DELAY);


          expect(db.object).toHaveBeenCalledWith(`/poll/${poll.id}`);
          expect(db.object).toHaveBeenCalledTimes(1);

        }));

        it('should return the value with an id', fakeAsync(() => {
          let results: any[] = [];

          target.object(`/poll/${poll.id}`).subscribe(val => results.push(val));

          tick(RESPONSE_DELAY + 100);

          expect(results.length).toEqual(1);
          expect(results[ 0 ].id).toEqual(poll.id);

        }));

      });

      describe('list()', () => {

        it('should query the database once for the requested list of values', fakeAsync(() => {

          let results: any[][] = [];

          target.list(`/poll/${poll.id}`).subscribe(val => results.push(val));

          tick(RESPONSE_DELAY / 2);
          expect(results.length).toEqual(0);
          tick(RESPONSE_DELAY);

          expect(db.list).toHaveBeenCalledWith(`/poll/${poll.id}`);
          expect(db.list).toHaveBeenCalledTimes(1);

        }));

        it('should return an array of values, each with an id', fakeAsync(() => {
          let results: any[] = [];

          target.list(`/poll/${poll.id}`).subscribe(val => results.push(val));

          tick(RESPONSE_DELAY + 100);

          expect(results.length).toEqual(1);
          expect(results[ 0 ].length).toEqual(polls.length);

          expect(typeof results[ 0 ] == typeof []).toBeTruthy();

          const pollIds = polls.map(poll => poll.id);
          results[ 0 ].forEach(it => {
            expect(it.id).toBeDefined();
            expect(pollIds.indexOf(it.id)).toBeGreaterThanOrEqual(0);
          })
        }));

      });

    });
  });
});


function mockNgFireDatabase(returnVals: { object?: any, list?: any[] } = {}) {

  let it = jasmine.createSpyObj('angularFireDatabase', [ 'list', 'object' ]);

  if (returnVals.object) {
    it.object.and.returnValue(Observable.timer(RESPONSE_DELAY).map(() => prepObject(returnVals.object)));
  }
  if (returnVals.list) {
    it.list.and.returnValue(Observable.timer(RESPONSE_DELAY).map(() => returnVals.list.map(it => prepObject(it))));
  }


  return it;

}

function prepObject(it): any {
  let val = { ...it }; //i.e. copy it
  if (it.id) {
    val.$key = it.id;
    delete val.id; //these
  } else {
    val.$key = mockId();
  }
  return val;
};
