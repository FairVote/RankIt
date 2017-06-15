import { InjectionToken } from '@angular/core';
import { Datasource } from './data';
import { AuthProvider } from './auth';

export const BROWSER = 'BROWSER';
export const NODE = 'NODE';

export const DatasourceToken: InjectionToken<Datasource> = new InjectionToken('@rankit:widget:datasource');
export const AuthProviderToken: InjectionToken<AuthProvider> = new InjectionToken('@rankit:widget:auth');
export const PlatformToken: InjectionToken<'BROWSER' | 'NODE'> = new InjectionToken('@rankit:widget:platformType');
