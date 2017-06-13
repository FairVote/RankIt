import { InjectionToken } from '@angular/core';
import { Datasource } from './interfaces';

export const DatasourceToken: InjectionToken<Datasource> = new InjectionToken('@rankit:widget:datasource');
