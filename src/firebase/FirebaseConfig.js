import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyCB95rYhXfFQ0Yq2tRPyEVB0C1E7a5DAQA',
  authDomain: 'bitesquare-go.firebaseapp.com',
  projectId: 'bitesquare-go',
  storageBucket: 'bitesquare-go.appspot.com',
  messagingSenderId: '1035647196911',
  appId: '1:1035647196911:web:53dec5d2e12dc0c50e851a',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
