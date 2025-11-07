import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';

const firebaseConfig = {
  apiKey: 'AIzaSyDQ3L5107Zc_tK-KQovywqCpl5Q_W3AzZI',
  authDomain: 'mb-mobile-bazaar.firebaseapp.com',
  databaseURL: 'https://mb-mobile-bazaar-default-rtdb.firebaseio.com',
  projectId: 'mb-mobile-bazaar',
  storageBucket: 'mb-mobile-bazaar.appspot.com',
  messagingSenderId: '960200772659',
  appId: '1:960200772659:web:93926e835b5a1c8db7c42f',
  measurementId: 'G-9DZJ9V6HRJ'
};

const firebaseApp = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

export const auth = firebaseApp.auth();
export const database = firebaseApp.database();
export const googleProvider = new firebase.auth.GoogleAuthProvider();

export default firebaseApp;
