importScripts("https://www.gstatic.com/firebasejs/7.16.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/7.16.0/firebase-messaging.js"
);

// init firebase

var firebaseConfig = {
  apiKey: "AIzaSyBnNSx9IyPZVwtEOcD6lLPclldpsTOQpao",
  authDomain: "fcmtest-8284d.firebaseapp.com",
  databaseURL: "https://fcmtest-8284d.firebaseio.com",
  projectId: "fcmtest-8284d",
  storageBucket: "fcmtest-8284d.appspot.com",
  messagingSenderId: "500464585581",
  appId: "1:500464585581:web:c9b55c426f8b2293232864",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();
