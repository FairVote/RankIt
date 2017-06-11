import { enableProdMode } from '@angular/core';

import { INITIAL_CONFIG, platformServer } from '@angular/platform-server';
import { ServerWidgetModule } from './src/server-widget.module';
import { environment } from '../environments/environment';

if (environment.production) {
  enableProdMode();
}

const document = `
  <!doctype html>
  <html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Rankit</title>
    <base href="/">
  
    <meta name="viewport" content="width=device-width, initial-scale=1">
  </head>
  <body>
  <rankit-widget-root></rankit-widget-root>
  </body>
  </html>
`;

platformServer(
  [
    {
      provide: INITIAL_CONFIG,
      useValue: {
        document,
        url: 'id_foo'
      }
    }
  ]
).bootstrapModule(ServerWidgetModule);
