import Stomp from 'stompjs';
import SockJS from 'sockjs-client';
import { KEY_LOCAL_STORAGE } from './constants/general.constant';

const WebSocketService = () => {
  let stompClient;
  let isConnected = false;
  const headers = {
    Authorization: `Bearer ${localStorage.getItem(KEY_LOCAL_STORAGE.AUTHEN)}`,
    // Add any other headers you need here
  };

  const connect = () => {
    const url_ws = process.env.REACT_APP_WS_URL;
    const socket = new SockJS(url_ws, null , { headers });
    stompClient = Stomp.over(socket);

    stompClient.connect(headers, () => {
      console.log('Connected to WebSocket');
      isConnected = true;
    });
  };

  const disconnect = () => {
    if (stompClient) {
      stompClient.disconnect();
      console.log('Disconnected from WebSocket');
      isConnected = false;
    }
  };

  const sendMessage = (destination, message) => {
    if (isConnected) {
      stompClient.send(destination, {}, JSON.stringify(message));
    } else {
      console.error('WebSocket is not connected. Cannot send message.');
    }
  };

  const subscribe = (destination, callback) => {
    if (isConnected) {
      stompClient.subscribe(destination, (response) => {
        const message = JSON.parse(response.body);
        callback(message);
      });
    } else {
      console.error('WebSocket is not connected. Cannot subscribe.');
    }
  };

  return {
    connect,
    disconnect,
    sendMessage,
    subscribe,
  };
};

export default WebSocketService;
