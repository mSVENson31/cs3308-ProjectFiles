import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyA_MfCMPy8STztdl6zX6xdmtyR-UGABOGU",
  authDomain: "booklist-9d89f.firebaseapp.com",
  databaseURL: "https://booklist-9d89f.firebaseio.com",
  projectId: "booklist-9d89f",
  storageBucket: "booklist-9d89f.appspot.com",
  messagingSenderId: "472931690649"
};

export default !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();