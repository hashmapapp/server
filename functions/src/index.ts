import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as corsOrigin from 'cors';
import { CreateUser } from './user/create';
import { DeleteUser } from './user/delete';

const cors = corsOrigin({ origin: true });
admin.initializeApp();
const firestore = admin.firestore();
const auth = admin.auth();
const createUser = new CreateUser(firestore, auth);
const deleteUser = new DeleteUser(firestore);

// export const createUserByAuth = functions.auth.user().onCreate((user) => {
//   if (user.email) {
//     createUser.onFirestore({ email: user.email, displayName: user.displayName || '' }, user.uid);
//   } else {
//     console.error('[CRETE USER] Email Undefined');
//   }
// });

export const deleteUserByAuth = functions.auth.user().onDelete((user) => {
  deleteUser.onFirestore(user.uid);
});

export const createUserByRequest = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    const { body } = req;
    createUser.onAuth(body, (userRecord: any) => {
      console.log('Successfully created new user:', userRecord.uid);
      res.status(201).send({ displayName: body.displayName, email: body.email, uid: userRecord.uid });
    }, (error: any) => {
      console.log('Error creating new user:', error);
      res.status(400).send({ error });
    })
  });
});
