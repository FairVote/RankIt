import { NgModule } from '@angular/core';
import { BallotViewComponent } from './view/ballot-view.component';
import { BallotPageComponent } from './ballot-page.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [ BallotViewComponent, BallotPageComponent ]
})
export class BallotModule {}
