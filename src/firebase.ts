import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { GENERATED_MESSAGING_KEY } from "./constants/general.constant";
import { success } from "./Common/notify";

const firebaseConfig = {
    apiKey: "AIzaSyCaUHSXWWGWLjz9p700fvwjzccTFgaXZxY",
    authDomain: "sep490-hms.firebaseapp.com",
    projectId: "sep490-hms",
    storageBucket: "sep490-hms.appspot.com",
    messagingSenderId: "858492094553",
    appId: "1:858492094553:web:03be3f18835757ce758948",
    measurementId: "G-MTSWM2ZZ90"
};

const app = initializeApp(firebaseConfig);

const messaging = getMessaging(app);

export const requestForToken = () => {
    return getToken(messaging, { vapidKey: GENERATED_MESSAGING_KEY })
        .then((currentToken) => {
            if (currentToken) {
                console.log("currentToken:", currentToken)
                return currentToken;
                // Perform any other neccessary action with the token
            } else {
                // Show permission request UI
                console.log(
                    "No registration token available. Request permission to generate one."
                );
            }
        })
        .catch((err) => {
            console.log("An error occurred while retrieving token. ", err);
        });
};

export const onMessageListener = () =>
    new Promise((resolve) => {
        onMessage(messaging, (payload: any) => {
            const newNoti = {
                title: payload.notification.title,
                body: payload.notification.body,
            };
            const roomId = JSON.parse(
                payload.data["gcm.notification.payload"]
            ).whereToId;
            // success(ToastMessageLink(roomId, newNoti.title, newNoti.body));
            resolve(newNoti);
        });
    });