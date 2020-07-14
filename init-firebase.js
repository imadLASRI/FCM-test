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

let user_token = "";

messaging
  .requestPermission()
  .then(function () {
    console.log("GOT PERMISSION");
    return messaging.getToken();
  })
  .then(function (token) {
    console.log(
      "HERE IS THE PUSH TOKEN (to store in DB to send a msg to this user): "
    );
    user_token = token;
    console.log(token);
  })
  .catch(function (err) {
    console.log("ERROR :" + err);
  });

// check if token has been refreshed

// Callback fired if Instance ID token is updated.
messaging.onTokenRefresh(() => {
  messaging
    .getToken()
    .then((refreshedToken) => {
      console.log("Token refreshed.");
      // Indicate that the new Instance ID token has not yet been sent to the
      // app server.
      setTokenSentToServer(false);
      // Send Instance ID token to app server.
      sendTokenToServer(refreshedToken);
      // ...
      user_token = refreshedToken;
    })
    .catch((err) => {
      console.log("Unable to retrieve refreshed token ", err);
      showToken("Unable to retrieve refreshed token ", err);
    });
});

//

// display the recieved msg ON THE PAGE if page is open
messaging.onMessage(function (payload) {
  console.log("onMessage payload : ", payload);
});

//

$(function () {
  $("#sendFCM").click(function () {
    if (user_token !== "") {
      $.ajax({
        url: "https://fcm.googleapis.com/fcm/send",
        type: "POST",
        contentType: "application/json",
        authorization: "key=AIzaSyBnNSx9IyPZVwtEOcD6lLPclldpsTOQpao",
        data: {
          to:
            "coGafHqDslJf7DMuZAhLzD:APA91bFLIEGkX_NjGnM-X7nzkr0tD5W1Jh_qAMYYB3wOnTnvQVnYiUhjgeuT09wPmpaLVEDcy9esk8wNIpw2QtYDwN72B0OqxOuuGRlG8J_NqrLwcpXPvcnfFiGW38nvmW7WRJY1Umqd",
          notification: {
            title: "This is my notification title",
            body: "This is my notification message",
          },
        },

        success: function (data) {
          console.log("ajax call success");
        },
      });
    } else {
      console.log("NO TOKEN YET");
    }
  });
});

//
console.log("EOF - init ");
