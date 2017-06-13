import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BallotViewComponent } from './view/ballot-view.component';
import { BallotPageComponent } from './ballot-page.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ BallotViewComponent, BallotPageComponent ]
})
export class BallotModule {}
