// !!! IMPORTANT !!!
// Initialize this script at the bottom of your <body> tag, but before you use any Firebase services

const firebaseConfig = {
    apiKey: "AIzaSyBaZHm6ZVMik8nQSd9By8swddN_23rsAhU",
    authDomain: "comp2800-covid-companion.firebaseapp.com",
    databaseURL: "https://comp2800-covid-companion.firebaseio.com",
    projectId: "comp2800-covid-companion",
    storageBucket: "comp2800-covid-companion.appspot.com",
    messagingSenderId: "1049614650890",
    appId: "1:1049614650890:web:1c78ffca70f68c90ead9f3",
    measurementId: "G-XLKW7NCXFD"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var db = firebase.firestore();
