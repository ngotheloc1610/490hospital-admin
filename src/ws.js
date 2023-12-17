import Stomp from 'stompjs';
import SockJS from 'sockjs-client';

const WebSocketService = () => {
  let stompClient;

  const connect = () => {
    const url_ws = process.env.REACT_APP_WS_URL;
    const socket = new SockJS(url_ws);
    stompClient = Stomp.over(socket);
    stompClient.connect({}, () => {
      console.log('Connected to WebSocket');
    });
  };

  const disconnect = () => {
    if (stompClient) {
      stompClient.disconnect();
      console.log('Disconnected from WebSocket');
    }
  };

  const sendMessage = (destination, message) => {
    stompClient.send(destination, {}, JSON.stringify(message));
  };

  const subscribe = (destination, callback) => {
    stompClient.subscribe(destination, (response) => {
      const message = JSON.parse(response.body);
      callback(message);
    });
  };

  return {
    connect,
    disconnect,
    sendMessage,
    subscribe,
  };
};

export default WebSocketService;
