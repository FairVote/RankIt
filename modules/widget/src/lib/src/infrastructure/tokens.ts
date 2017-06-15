import { InjectionToken } from '@angular/core';
import { Datasource } from './interfaces';

export const BROWSER = 'BROWSER';
export const NODE = 'NODE';

export const DatasourceToken: InjectionToken<Datasource> = new InjectionToken('@rankit:widget:datasource');
export const PlatformToken: InjectionToken<'BROWSER' | 'NODE'> = new InjectionToken('@rankit:widget:platformType');
