import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionService } from '../services/session.service';

import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Poll } from '../models/poll';


@Component({
  selector: 'rankit-ballot',
  template: `
    <rankit-ballot-view *ngIf="poll$ | async as poll; else loading" [poll]="poll">

    </rankit-ballot-view>
    <ng-template #loading>loading</ng-template>
  `,
  styles: []
})
export class BallotPageComponent implements OnInit {
  poll$: Observable<Poll>;
  constructor(private router: Router, private route: ActivatedRoute, private sessionService: SessionService) {

    this.route.params
      .map(params => params[ 'pollId' ])
      .subscribe(pollId => {
        this.sessionService.setActivePoll(pollId);
      });

    this.poll$ = this.sessionService.getActivePoll();

  }

  ngOnInit() {
  }

}
