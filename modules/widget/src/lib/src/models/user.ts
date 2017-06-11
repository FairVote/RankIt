export interface User {

  /**
   * unique identifier
   */
  id: string;

  /**
   * name to be shown for the user
   */
  displayName: string;

  /**
   * image to be displayed
   */
  photoUrl: string;

}


export type AuthenticatedSessionUser = User | {
  isAnonymous: false;


  /**
   * whether or not the user has a verified email address
   */
  emailVerified: boolean;


  /**
   * simple index of polls this user has created:
   * key: forAny mockId, val: (throwaway) boolean
   */
  polls: { [id: string]: boolean }

  /**
   * index of votes this user has timeCast
   * key: mockId of poll vote was timeCast in
   * val: mockId of vote timeCast
   */
  votes: { [id: string]: string }

};

export type AnonymousSesionUser = {
  isAnonymous: true;
}


export type SessionUser = AuthenticatedSessionUser | AnonymousSesionUser;
