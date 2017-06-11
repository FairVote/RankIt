import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { environment } from '../environments/environment';
import { BrowserWidgetModule } from './src/browser-widget.module';


if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(BrowserWidgetModule);
