import { INITIAL_CONFIG, platformServer, PlatformState } from '@angular/platform-server';
import { ServerWidgetModule } from './server-widget.module';
import { ApplicationRef, NgModuleRef } from '@angular/core';
import { ServerWidgetModuleNgFactory } from './ngfactory/server-widget.module.ngfactory';

import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/toPromise';

export async function renderWidget(pollId: string) {

  const document = require('../../index.html');
  let moduleRef: NgModuleRef<ServerWidgetModule>;

  try {

    moduleRef = await platformServer(
      [
        {
          provide: INITIAL_CONFIG,
          useValue: {
            document,
            url: `/${pollId}`
          }
        }
      ]
    ).bootstrapModuleFactory(ServerWidgetModuleNgFactory);

  } catch (err) {
    console.log(`Error during bootstrap process: ${err.message}`);
    throw err;
  }

  const state = moduleRef.injector.get(PlatformState);
  const appRef = moduleRef.injector.get(ApplicationRef);

  try {
    await appRef.isStable
      .filter(val => val === true)
      .first()
      .toPromise();
  } catch (err) {
    console.log(`Error during post-bootstrap runtime process: ${err.message}`);
    throw err;
  }

  try {
    /* call functions on the module before toStringing and destroying it
 moduleRef.instance.serializeState();
 */
    const html = state.renderToString();

    moduleRef.destroy();

    return html;

  } catch (err) {
    console.log(`Error in toStringing app: ${err.message}`);
    throw err;
  }

}
