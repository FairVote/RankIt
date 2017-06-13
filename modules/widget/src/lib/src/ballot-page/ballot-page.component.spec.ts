import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BallotPageComponent } from './ballot-page.component';

describe('ballot', () => {

  describe('BallotPageComponent', () => {
    let component: BallotPageComponent;
    let fixture: ComponentFixture<BallotPageComponent>;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [ BallotPageComponent ]
      })
        .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(BallotPageComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should be created', () => {
      expect(component).toBeTruthy();
    });
  });

});
