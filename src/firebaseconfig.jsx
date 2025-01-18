// firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAZrXqVD7NVdYOVAzjDko-ONksRoMTc7ho",
    authDomain: "portfolioformdata-4caae.firebaseapp.com",
    databaseURL: "https://portfolioformdata-4caae-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "portfolioformdata-4caae",
    storageBucket: "portfolioformdata-4caae.appspot.com",
    messagingSenderId: "51070256017",
    appId: "1:51070256017:web:ecd78be2fcf433607c1030",
    measurementId: "G-5JJ5QN0TRP"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
