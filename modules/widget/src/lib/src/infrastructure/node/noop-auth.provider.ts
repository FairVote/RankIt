import { AuthProvider, AuthUserObject } from '../auth';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class NoopAuthProvider implements AuthProvider {
  signOut(): Promise<any> {
    throw new Error('Auth functions are not available on the current platform. ');
  }

  get authUser$(): Observable<AuthUserObject> {
    throw new Error('Auth functions are not available on the current platform. ');
  }

  confirmPasswordReset(code: string, newPassword: string): Promise<any> {
    throw new Error('Auth functions are not available on the current platform. ');
  }

  createUserWithEmailAndPassword(email: string, password: string): Promise<any> {
    throw new Error('Auth functions are not available on the current platform. ');
  }

  fetchProvidersForEmail(email: string): Promise<any> {
    throw new Error('Auth functions are not available on the current platform. ');
  }

  sendPasswordResetEmail(email: string): Promise<any> {
    throw new Error('Auth functions are not available on the current platform. ');
  }

  signInAnonymously(): Promise<any> {
    throw new Error('Auth functions are not available on the current platform. ');
  }

  signInWithSocial(provider: string): Promise<any> {
    throw new Error('Auth functions are not available on the current platform. ');
  }

  signInWithEmailAndPassword(email: string, password: string): Promise<any> {
    throw new Error('Auth functions are not available on the current platform. ');
  }


}
