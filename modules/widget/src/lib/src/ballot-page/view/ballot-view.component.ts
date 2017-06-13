import { Component, Input, OnInit } from '@angular/core';
import { Poll } from '../../models/poll';

@Component({
  selector: 'rankit-ballot-view',
  templateUrl: './ballot-view.component.html',
  styleUrls: [ './ballot-view.component.scss' ]
})
export class BallotViewComponent implements OnInit {

  @Input() poll: Poll;

  constructor() { }

  ngOnInit() {
  }

}
