import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, set, ref, remove, update, onValue, get, push, onChildAdded, onChildRemoved, onChildChanged} from "firebase/database";

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export default database;



// BELOW ARE ALL USED METHODS FROM FIREBASE

// const unSub = onChildAdded(ref(database, 'expenses'), (snapshot) => {
//     console.log(snapshot.key, snapshot.val());
// }, (error) => {
//     console.log('Error occured: ' + error);
// })

// const unSub = onChildRemoved(ref(database, 'expenses'), (snapshot) => {
//     console.log(snapshot.key, snapshot.val());
// }, (error) => {
//     console.log('Error occured: ' + error);
// })

// const unSub = onChildChanged(ref(database, 'expenses'), (snapshot) => {
//     console.log(snapshot.key, snapshot.val());
// }, (error) => {
//     console.log('Error occured: ' + error);
// })

// const unSub = onValue(ref(database, 'expenses'), (snapshot) => {
//     const expenses = [];
//     snapshot.forEach((childSnapshot) => {
//       expenses.push({
//         id: childSnapshot.key,
//         ...childSnapshot.val()
//       });
//     });
//     console.log(expenses);
// }, (error) => {
//     console.log('Error occured: ' + error);
// })

// push(ref(database, 'expenses'), {
//     description: 'New bill',
//     note: 'new note wb',
//     amount: 3900,
//     createdAt: 7900
// });

// const unSub = onValue(ref(database, 'notes/-Mnb7HmIXZxTaN1u59kC'), (snapshot) => {
//     const data = snapshot.val();
//     console.log(data);
// })

// setTimeout(() => {
//   update(ref(database, 'notes/-Mnb7HmIXZxTaN1u59kC'), {
//       body: 'Buy food'
//   })
// }, 3000)

// push(ref(database, 'notes'), {
//     title: 'Course topics!',
//     body: 'React native, angular, python'
// })

// const unSub = onValue(ref(database), (snapshot) => {
//     const data = snapshot.val();
//     console.log(`${data.name} is a ${data.job.title} at ${data.job.company}`);
// }, (error) => {
//     console.log('Error occured: ' + error);
// })


// const unSub = onValue(ref(database), (snapshot) => {
//     const data = snapshot.val();
//     console.log(data);
// }, (error) => {
//     console.log('Error occured: ' + error);
// })

// setTimeout(() => {
//   set(ref(database,'age'), 29);
// }, 3500)

// setTimeout(() => {
//     set(ref(database,'age'), 30);
//     unSub();
//   }, 7000)

//   setTimeout(() => {
//     set(ref(database,'age'), 31);
//   }, 10500)

// set(ref(database), {
//     name: 'Aleksa Marinkovic',
//     age: 26,
//     stressLevel: 6,
//     job: {
//         title: 'Software developer',
//         company: 'Google'
//     },
//     location: {
//         city: 'Novi Sad',
//         country: 'Serbia'
//     }
// }).then(() => {
//     console.log('Data is saved!');
// }).catch((e) => {
//   console.log(`This failed: ${e}`);
// });

// update(ref(database), {
//     stressLevel: 9,
//     'job/company': 'Amazon',
//     'location/city': 'Seattle'
// });

// set(ref(database), null).then(() => {
//     console.log('Data is saved!');
// }).catch((e) => {
//   console.log(`This failed: ${e}`);
// });