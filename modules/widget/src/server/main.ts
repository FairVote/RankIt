import { enableProdMode } from '@angular/core';

import { INITIAL_CONFIG, platformServer } from '@angular/platform-server';
import * as fs from 'fs';
import * as path from 'path';
import { ServerWidgetModule } from './src/server-widget.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

const document = fs.readFileSync(path.join(__dirname, '..', 'index.html')).toString();


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
