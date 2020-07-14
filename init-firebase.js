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
  console.log("onMessage payload (if page is open): ", payload);
});

//
// Needed to use the new serverkey (the longer one) for the authorisation
$(function () {
  $("#sendFCM").click(function () {
    if (user_token !== "") {
      $.ajax({
        url: "https://fcm.googleapis.com/fcm/send",
        type: "POST",
        contentType: "application/json",
        headers: {
          Authorization:
            "key=AAAAdIYDi20:APA91bE2oeapo9rHxh07nacpP7RTsrVGRivCc3_GHiW0Dxs-xkhqVnY1irqh4kZtRw_P0PbTe5p4Y7BqwaR1gYpZcKA87VqZKXBwMQJLND_hFlaV18Ix1GDSvDl_rjkB-ZiaxIErKSah",
        },
        dataType: "json",
        data: JSON.stringify({
          to: $("#usertoken").val(),
          notification: {
            title: $("#notification_title").val(),
            body: $("#notification_body").val(),
          },
        }),

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
