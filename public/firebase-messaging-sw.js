// [START initialize_firebase_in_sw]
// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.
importScripts("https://www.gstatic.com/firebasejs/7.15.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/7.15.0/firebase-messaging.js"
);
// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
  apiKey: "AIzaSyBnNSx9IyPZVwtEOcD6lLPclldpsTOQpao",
  authDomain: "fcmtest-8284d.firebaseapp.com",
  databaseURL: "https://fcmtest-8284d.firebaseio.com",
  projectId: "fcmtest-8284d",
  storageBucket: "fcmtest-8284d.appspot.com",
  messagingSenderId: "500464585581",
  appId: "1:500464585581:web:c9b55c426f8b2293232864",
});
// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();
// [END initialize_firebase_in_sw]
