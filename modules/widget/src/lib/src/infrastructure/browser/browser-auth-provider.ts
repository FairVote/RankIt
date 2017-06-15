import * as firebase from 'firebase';
import { AuthProvider, AuthUserObject } from '../auth';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class BrowserAuthProvider implements AuthProvider {

  constructor(private afAuth: AngularFireAuth) {}

  async confirmPasswordReset(code: string, newPassword: string): Promise<any> {
    return await this.afAuth.auth.confirmPasswordReset(code, newPassword);
  }

  async createUserWithEmailAndPassword(email: string, password: string): Promise<any> {
    return await this.afAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  async fetchProvidersForEmail(email: string): Promise<any> {
    return await this.afAuth.auth.fetchProvidersForEmail(email);
  }

  async sendPasswordResetEmail(email: string): Promise<any> {
    return await this.afAuth.auth.sendPasswordResetEmail(email);


  }

  async signInAnonymously(): Promise<any> {
    return await this.afAuth.auth.signInAnonymously();
  }

  async signInWithSocial(provider: string): Promise<any> {

    switch (provider.toLowerCase()) {
      case 'facebook':
        return await this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
      case 'twitter':
        return await this.afAuth.auth.signInWithPopup(new firebase.auth.TwitterAuthProvider());
      case 'google':
        return await this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
      default:
        throw new Error(`Invalid auth provider ${provider}`);
    }

  }

  async signInWithEmailAndPassword(email: string, password: string): Promise<any> {
    return await this.afAuth.auth.signInWithEmailAndPassword(email, password);

  }

  async signOut(): Promise<any> {
    return await this.afAuth.auth.signOut();
  }

  get authUser$(): Observable<AuthUserObject> {
    return this.afAuth.authState as Observable<any>;
  }


}

