import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BallotViewComponent } from './ballot-view.component';

describe('BallotViewComponent', () => {
  let component: BallotViewComponent;
  let fixture: ComponentFixture<BallotViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BallotViewComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BallotViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
