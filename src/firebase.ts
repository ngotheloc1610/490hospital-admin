import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { GENERATED_MESSAGING_KEY } from "./constants/general.constant";
import { success } from "./Common/notify";

const firebaseConfig = {
    apiKey: "AIzaSyDqo2uQS8LxHFEMIYW2vulyLEXlRK7BFG0",
    authDomain: "dhp-project-82573.firebaseapp.com",
    projectId: "dhp-project-82573",
    storageBucket: "dhp-project-82573.appspot.com",
    messagingSenderId: "1061115445853",
    appId: "1:1061115445853:web:e95f7dd48f1cef14e683b4",
    measurementId: "G-2WHB5GSHYH",
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