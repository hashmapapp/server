import { USERS_COLLECTION } from '../constants';
import { ConfigFire } from './config.interface';

export class CreateUser implements ConfigFire {

  constructor(public firestore: any, public auth: any) { }

  onFirestore = (user: { email: string, displayName: string }, uid: string) => {
    const username = user.email.split('@')[0];
    const role = 'productor';
    const displayName = user.displayName;
    const ref = this.firestore.collection(USERS_COLLECTION).doc(uid);
    ref.set({ ...user, username, role, displayName }).catch((err: any) => console.error(err));
  }

  onAuth = (user: { displayName: string, email: string, password: string },
    callbackSuccess: any, callbackError: any) => {
    this.auth.createUser(user).then(callbackSuccess).catch(callbackError);
  };

}
