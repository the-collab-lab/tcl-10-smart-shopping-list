// NOTE: import only the Firebase modules that you need in your app... except
// for the second line, which makes both the linter and react-firebase happy
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/firestore';
import { calculateFrequency } from './estimates';

// Initalize Firebase.
// These details will need to be replaced with the project specific env vars at the start of each new cohort.
var firebaseConfig = {
  apiKey: 'AIzaSyDFXBbPe8ZUkuAIc4Ep-BGbesyTW4yPy-g',
  authDomain: 'tcl-10-smart-shopping-list.firebaseapp.com',
  databaseURL: 'https://tcl-10-smart-shopping-list.firebaseio.com',
  projectId: 'tcl-10-smart-shopping-list',
  storageBucket: 'tcl-10-smart-shopping-list.appspot.com',
  messagingSenderId: '946401926689',
  appId: '1:946401926689:web:24889e069cf0aff111cd60',
};

let fb = firebase.initializeApp(firebaseConfig);
let db = firebase.firestore();
let timestamp = firebase.firestore.Timestamp.now().toMillis();

export function updatePurchaseDate(
  collectionName,
  itemId,
  existingPurchaseDates,
) {
  if (existingPurchaseDates.length > 2) {
    const newPurchaseDates = [...existingPurchaseDates, timestamp];
    updateFirestore(collectionName, itemId, {
      purchaseDates: firebase.firestore.FieldValue.arrayUnion(timestamp),
      frequency: calculateFrequency(newPurchaseDates),
    });
  } else {
    updateFirestore(collectionName, itemId, {
      purchaseDates: firebase.firestore.FieldValue.arrayUnion(timestamp),
    });
  }
}

export function deleteItem(collectionName, itemId = {}) {
  const itemRef = db.collection(collectionName).doc(itemId);
  itemRef.delete();
}

export function writeToFirestore(collectionName, options = {}) {
  db.collection(collectionName).add(options);
}

export function updateFirestore(collectionName, itemId = {}, options = {}) {
  db.collection(collectionName)
    .doc(itemId)
    .update(options);
}

export { fb, db, timestamp };
