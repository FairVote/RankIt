import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionService } from '../services/session.service';

import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';


@Component({
  selector: 'app-ballot-page',
  template: `
    <p>
      ballot-page Works!
    </p>
  `,
  styles: []
})
export class BallotPageComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute, private sessionService: SessionService) {
    this.route.params
      .map(params => params[ 'pollId' ])
      .subscribe(pollId => {
        this.sessionService.setActivePoll(pollId);
      })

  }

  ngOnInit() {
  }

}
