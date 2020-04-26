import firebase from 'firebase';
import '@firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBlI-rh7op5BmE04eKgeGr8obwhmf_wmGs',
  authDomain: 'yttodoapp-4e6c0.firebaseapp.com',
  databaseURL: 'https://yttodoapp-4e6c0.firebaseio.com',
  projectId: 'yttodoapp-4e6c0',
  storageBucket: 'yttodoapp-4e6c0.appspot.com',
  messagingSenderId: '1024113875578',
  appId: '1:1024113875578:web:f6abba646aed37863c39c3',
};

/* TODO: criar interface do callback */
class Fire {
  unsubscribe;
  constructor(callback) {
    this.init(callback);
  }
  init(callback) {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        callback(null, user);
      } else {
        firebase
          .auth()
          .signInAnonymously()
          .catch((error) => {
            callback(error);
          });
      }
    });
  }

  getLists(callback) {
    const ref = firebase.firestore().collection('users').doc(this.userId).collection('lists');

    this.unsubscribe = ref.onSnapshot((snapshot) => {
      const lists = [];

      snapshot.forEach((doc) => {
        lists.push({ id: doc.id, ...doc.data() });
      });

      callback(lists);
    });
  }

  get userId() {
    return firebase.auth().currentUser.uid;
  }

  detach() {
    this.unsubscribe();
  }
}
export default Fire;
