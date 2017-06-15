import { Observable } from 'rxjs/Observable';

export interface AuthUserObject {
  displayName: string;
  isAnonymous: boolean ;
  email: string | null ;
  photoURL: string | null ;
  providerId: string ;
  uid: string ;

  updateEmail (newEmail: string): Promise<any> ;

  updatePassword (newPassword: string): Promise<any> ;

  updateProfile (profile: { displayName: string | null, photoURL: string | null }): Promise<any> ;

  sendEmailVerification (): Promise<any> ;

  toJSON (): Object ;
}

export interface AuthProvider {
  readonly authUser$: Observable<AuthUserObject>;

  confirmPasswordReset (code: string, newPassword: string): Promise<any> ;

  createUserWithEmailAndPassword (email: string, password: string): Promise<any> ;

  fetchProvidersForEmail (email: string): Promise<any> ;

  sendPasswordResetEmail (email: string): Promise<any> ;

  signInAnonymously (): Promise<any> ;

  signInWithSocial (provider: string): Promise<any> ;

  signInWithEmailAndPassword (email: string, password: string): Promise<any> ;

  signOut (): Promise<any> ;

}
