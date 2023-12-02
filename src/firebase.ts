import { log } from 'util';
import { getMessaging, getToken } from 'firebase/messaging';
import { getFirestore } from 'firebase/firestore/lite';
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyCaUHSXWWGWLjz9p700fvwjzccTFgaXZxY",
    authDomain: "sep490-hms.firebaseapp.com",
    projectId: "sep490-hms",
    storageBucket: "sep490-hms.appspot.com",
    messagingSenderId: "858492094553",
    appId: "1:858492094553:web:03be3f18835757ce758948",
    measurementId: "G-MTSWM2ZZ90"
};

// const firestore = getFirestore(firebaseApp)
// const auth = getAuth(firebaseApp);


function requestPermission() {
    Notification.requestPermission().then((permission: any) => {
        if (permission === "granted") {
            console.log("notification permisstion granted");
            const firebaseApp = initializeApp(firebaseConfig);
            const messaging = getMessaging(firebaseApp);

            getToken(messaging, { vapidKey: 'BEUKbyRgHgi_UbRaqXSC9ePzehNWhq4umKlvQXrshEAV5tuBMbxfw_Uhw3RE_LSP3MJXgWcYpJq6VaNZtrjBQbw' }).then((currentToken) => {
                if (currentToken) {
                    console.log("currentToken:", currentToken)
                } else {
                    console.log('No registration token available. Request permission to generate one.');
                    // ...
                }
            }).catch((err) => {
                console.log('An error occurred while retrieving token. ', err);
                // ...
            });

        } else {
            console.log("Do not have permission");

        }
    })
}

requestPermission()

// export { firestore, auth, messaging }