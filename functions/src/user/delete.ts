import { USERS_COLLECTION } from '../constants';
import { ConfigFire } from './config.interface';

export class DeleteUser implements ConfigFire {

  constructor(public firestore: any) { }

  onFirestore = (uid: string) => {
    const ref = this.firestore.collection(USERS_COLLECTION).doc(uid);
    ref.delete().catch((err: any) => console.error(err));
  };
}