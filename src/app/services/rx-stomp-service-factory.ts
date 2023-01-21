import {environment} from 'src/environments/environment';
import {WebsocketMessagingService} from './websocket-messaging.service';

export function websocketMessagingServiceFactory() {
  const websocket = new WebsocketMessagingService
  websocket.configure(environment.rxStompConfig);
  websocket.activate();
  return websocket;
}
