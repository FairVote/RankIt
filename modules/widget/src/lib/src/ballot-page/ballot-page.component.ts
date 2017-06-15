import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { SessionService } from '../services/session.service';
import { Poll } from '../models/poll';
import { WidgetState } from '../reducers/index';
import { AddToBallotAction, RemoveFromBallotAction, ReorderBallotAction } from './ballot.state';

import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';

@Component({
  selector: 'rankit-ballot',
  template: `
    <rankit-ballot-view *ngIf="poll$ | async as poll; else loading"
                        [poll]="poll"
                        [selections]="selections$ | async"
                        (add)="addToBallot($event)"
                        (remove)="removeFromBallot($event)"
                        (reorder)="reorderBallot($event)"
    >

    </rankit-ballot-view>
    <ng-template #loading>loading</ng-template>
  `,
  styles: []
})
export class BallotPageComponent implements OnInit, AfterViewInit {


  poll$: Observable<Poll>;
  selections$: Observable<string[]>;


  constructor(private router: Router,
              private route: ActivatedRoute,
              private sessionService: SessionService,
              private store: Store<WidgetState>) {

    this.route.params
      .map(params => params[ 'pollId' ])
      .subscribe(pollId => {
        this.sessionService.setActivePoll(pollId);
      });

    this.poll$ = this.sessionService.getActivePoll();

    this.selections$ = this.sessionService.getBallotState()
      .map(state => state.selections)
      .distinctUntilChanged((x, y) => x.join('_') === y.join('_'));


  }

  ngOnInit() {

  }

  ngAfterViewInit(): void {

  }


  addToBallot(id: string) {
    this.store.dispatch(new AddToBallotAction(id));
  }

  reorderBallot(change: { from: number, to: number }) {
    this.store.dispatch(new ReorderBallotAction(change.from, change.to));
  }


  removeFromBallot(id: string) {
    this.store.dispatch(new RemoveFromBallotAction(id));
  }

}
