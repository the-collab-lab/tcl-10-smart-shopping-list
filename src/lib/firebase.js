// NOTE: import only the Firebase modules that you need in your app... except
// for the second line, which makes both the linter and react-firebase happy
import firebase from 'firebase/app';
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

export function updatePurchaseDate(collectionName, itemId) {
  const itemRef = db.collection(collectionName).doc(itemId);
  console.log(itemId);
  return itemRef
    .update({
      purchaseDates: firebase.firestore.FieldValue.arrayUnion(
        firebase.firestore.Timestamp.now().toMillis(),
      ),
    })
    .then(function() {
      console.log('completed');
      db.collection(collectionName).onSnapshot(function(querySnapshot) {
        querySnapshot.docChanges().forEach(change => {
          console.log('change type', change.type);
          let purchaseDates = change.doc.data().purchaseDates;
          if (
            change.type === 'added' &&
            change.doc.id === itemId &&
            purchaseDates.length > 2
          ) {
            console.log('item id', itemId);
            console.log('matching id', change.doc.id);
            console.log('data to be changed', change.doc.data());
            console.log('purchase dates of changed item', purchaseDates);
            let updatedFrequency = calculateFrequency(purchaseDates);
            console.log('updated frequency', updatedFrequency);
            updateFirestore(collectionName, itemId, {
              frequency: updatedFrequency,
            });
          }
        });
      });
    });
}

export function writeToFirestore(collectionName, options = {}) {
  db.collection(collectionName).add(options);
}

export function updateFirestore(collectionName, itemId = {}, options = {}) {
  db.collection(collectionName)
    .doc(itemId)
    .update(options);
}

export { fb, db };
