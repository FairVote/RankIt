import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { environment } from '../environments/environment';
import { RankitWebsiteModule } from './website.module';


if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(RankitWebsiteModule);
