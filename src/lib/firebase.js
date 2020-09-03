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

export function updatePurchaseDate(collectionName, itemId, purchseDates) {
  //include current purchaseDates as parameter
  const itemRef = db.collection(collectionName).doc(itemId);
  const currentPurchaseDate = firebase.firestore.Timestamp.now().toMillis(); // set the new purchase date
  const newPurchaseDates = purchaseDates.concat(currentPurchaseDate); // set new purchase dates array for calculate function
  updateFrequency(collectionName, itemId, newPurchaseDates);
  return itemRef.update({
    purchaseDates: firebase.firestore.FieldValue.arrayUnion(
      currentPurchaseDate,
    ),
  });
}

export function updateFrequency(collectionName, itemId, purchaseDates) {
  let calculatedPurchaseFrequency = calculateFrequency(purchaseDates);
  updateFirestore(collectionName, itemId, {
    frequency: calculatedPurchaseFrequency,
  });
}

// export function updatePurchaseDate(collectionName, itemId) {
//   const itemRef = db.collection(collectionName).doc(itemId);
//   return itemRef
//     .update({
//       purchaseDates: firebase.firestore.FieldValue.arrayUnion(
//         firebase.firestore.Timestamp.now().toMillis(),
//       ),
//     })
//     .then(function() {
//       updateFrequency(collectionName, itemId);
//     });
// }

// export function updateFrequency(collectionName, itemId) {
//   db.collection(collectionName)
//     .where(firebase.firestore.FieldPath.documentId(), '==', itemId)
//     .onSnapshot(function(querySnapshot) {
//       querySnapshot.docChanges().forEach(change => {
//         let purchaseDates = change.doc.data().purchaseDates;
//         if (change.type === 'added' && purchaseDates.length > 2) {
//           let calculatedPurchaseFrequency = calculateFrequency(purchaseDates);
//           updateFirestore(collectionName, itemId, {
//             frequency: calculatedPurchaseFrequency,
//           });
//         }
//       });
//     });
// }

export function writeToFirestore(collectionName, options = {}) {
  db.collection(collectionName).add(options);
}

export function updateFirestore(collectionName, itemId = {}, options = {}) {
  db.collection(collectionName)
    .doc(itemId)
    .update(options);
}

export { fb, db };
