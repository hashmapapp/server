import { USERS_COLLECTION } from '../constants';
import { ConfigFire } from './config.interface';

export class CreateUser implements ConfigFire {

  constructor(public firestore: any, public auth: any) { }

  private onFirestore = (user: { email: string, displayName: string },
    uid: string, callbackSuccess: any, callbackError: any) => {
    const username = user.email.split('@')[0];
    const role = 'productor';
    const ref = this.firestore.collection(USERS_COLLECTION).doc(uid);
    ref.set({ ...user, username, role })
      .then(() => {
        callbackSuccess(user);
      }).catch(callbackError);
  }

  onAuth = (user: { displayName: string, email: string, password: string },
    callbackSuccess: any, callbackError: any) => {
    this.auth.createUser(user).then((userRecord: any) => {
      this.onFirestore({ email: user.email, displayName: user.displayName },
        userRecord.uid, callbackSuccess, callbackError);
    }).catch(callbackError);
  };

}
