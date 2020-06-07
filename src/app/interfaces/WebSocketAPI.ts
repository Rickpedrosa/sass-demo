import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';

export class WebSocketAPI {
  webSocketEndPoint = 'http://localhost:8080/websocket';
  topic = '/topic/teams/random';
  stompClient: any;

  _connect() {
    console.log('Initialize WebSocket Connection');
    const ws = new SockJS(this.webSocketEndPoint);
    this.stompClient = Stomp.over(ws);
    this.stompClient.connect({}, (frame) => {
      this.stompClient.subscribe(this.topic, (sdkEvent) => {
        this.onMessageReceived(sdkEvent);
      });
      // _this.stompClient.reconnect_delay = 2000;
    }, this.errorCallBack);
  }

  _disconnect() {
    if (this.stompClient !== null) {
      this.stompClient.disconnect();
    }
    console.log('Disconnected');
  }

  // on error, schedule a reconnection attempt
  errorCallBack(error) {
    console.log('errorCallBack -> ' + error);
    setTimeout(() => {
      this._connect();
    }, 5000);
  }

  _send(message) {
    console.log('calling logout api via web socket');
    this.stompClient.send('/app/random', {}, '');
  }

  onMessageReceived(message) {
    console.log('Message Recieved from Server :: ' + message);
  }
}
