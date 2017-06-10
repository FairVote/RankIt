import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BallotViewComponent, RankitCoreModule } from '@rankit/core';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent
  ],

  imports: [
    BrowserModule,
    RankitCoreModule,
    RouterModule.forRoot([
      {
        path: '',
        component: BallotViewComponent
      }
    ])

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class CoreDemoModule {}
