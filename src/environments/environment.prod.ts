import { RxStompConfig } from "@stomp/rx-stomp";

export const environment = {
  production: true,
  baseApiUrl: 'https://api.dreadfall.com',
  rxStompConfig: {
    brokerURL: 'ws://api.dreadfall.com/ws',
    heartbeatIncoming: 0,
    heartbeatOutgoing: 20000,
    reconnectDelay: 500
  } as RxStompConfig
};
