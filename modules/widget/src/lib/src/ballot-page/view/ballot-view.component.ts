import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Optional,
  Output,
  ViewChild
} from '@angular/core';
import { Poll, PollOption } from '../../models/poll';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MediaChange, ObservableMedia } from '@angular/flex-layout';
import { BROWSER, PlatformToken } from '../../infrastructure/tokens';

let dragula;

try {
  dragula = require('dragula');
  console.info('dragula found.')
} catch (err) {
  dragula = undefined;
  console.info(`dragula not present.`)
}

@Component({
  selector: 'rankit-ballot-view',
  templateUrl: './ballot-view.component.html',
  styleUrls: [ './ballot-view.component.scss' ],
  animations: [
    trigger('filler', [
      state('fill', style({ flex: '1 1 100%' })),
      state('hide', style({ flex: '0 0 0' })),
      transition('fill <=> hide', animate('250ms ease-in'))
    ]),
    trigger('selection', [
      transition(':enter', [
        style({ transform: 'translateX(-100px)', opacity: 0 }),
        animate('250ms 150ms ease-in', style({ transform: 'translateX(0)', opacity: 1 }))
      ])
    ])
  ]
})
export class BallotViewComponent implements OnInit, AfterViewInit {

  private _optionMap: { [id: string]: PollOption } = {};
  private _poll: Poll;
  @Input()
  set poll(poll: Poll) {
    this._poll = poll;
    this._optionMap = this._poll.options.reduce((result, next) => ({ ...result, [next.id]: next }), {});
  }

  @Input() selections: string[];


  @Output() add: EventEmitter<string> = new EventEmitter();
  @Output() remove: EventEmitter<string> = new EventEmitter();
  @Output() reorder: EventEmitter<{ from: number, to: number }> = new EventEmitter();

  @ViewChild('innerBallot') ballotDiv: ElementRef;


  private _smallViewport: boolean = false;

  /**
   * ObservableMedia is provided in the browser module, but not server module (flex-layout is not compatible)
   * @param media$
   * @param platform
   */
  constructor(@Optional() media$: ObservableMedia, @Inject(PlatformToken) private platform: string) {
    if (!!media$) {
      media$.subscribe((change: MediaChange) => {
        this._smallViewport = [ 'xs', 'sm' ].indexOf(change.mqAlias) >= 0;
      })
    }
  }

  ngAfterViewInit() {
    if (dragula && this.platform == BROWSER) {
      this.makeBallotDraggable();
    }
  }

  option(id: string) {
    return this._optionMap[ id ];
  }

  isSelected(optionId: string) {
    return this.selections.indexOf(optionId) >= 0;
  }

  get poll() { return this._poll; }

  instructions() {
    if (this.selections.length == 0) {
      return `${this._smallViewport ? 'Tap' : 'Click'} an option to make your first choice.`
    }

    if (this.selections.length == this.poll.options.length) {
      return `Reorder and cast your vote!`;
    }

    if (this.selections.length % 2 == 1) {
      return `${this._smallViewport ? 'Tap again' : 'Click the red X'} to remove an option from your ballot`
    } else {
      return `${this._smallViewport ? 'Touch' : 'Click'} and drag to reorder your ballot.`
    }
  }

  private makeBallotDraggable() {
    const drake = dragula({ containers: [ this.ballotDiv.nativeElement ] });


    drake.on('drop', (el, target?, handle?, sibling?) => {
      let movedId = el.getAttribute('opt-id');
      let movedBefore = sibling && sibling.getAttribute('opt-id') || null;

      let from = this.selections.indexOf(movedId);
      let to =
        (movedBefore == null ? this.selections.length : this.selections.indexOf(movedBefore));

      if (to > from) {
        to -= 1;
      }


      if (to != from) {
        this.reorder.emit({ from, to });

      }

      return true;
    });

  }

  ngOnInit() {
  }

}
