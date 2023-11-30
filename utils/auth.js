import firebase from 'firebase/app';
import 'firebase/auth';

const dbUrl = 'https://localhost:7149';

const checkUser = (uid) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/checkuser/${uid}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
    .then((resp) => {
      if (resp.status === 404) {
        resolve({ notFound: true });
      } else {
        resolve(resp.json());
      }
    })
    .catch(reject);
});
const registerUser = (userInfo) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/users`, {
    method: 'POST',
    body: JSON.stringify(userInfo),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
    .then((resp) => resolve(resp.json()))
    .catch(reject);
});

const signIn = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider);
};

const signOut = () => {
  firebase.auth().signOut();
};

export {
  signIn, //
  signOut,
  checkUser,
  registerUser,
  dbUrl,
};
