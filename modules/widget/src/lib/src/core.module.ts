import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BallotModule } from './ballot/ballot.module';

@NgModule({
  imports: [ CommonModule, BallotModule ]
})
export class RankitCoreModule {}
