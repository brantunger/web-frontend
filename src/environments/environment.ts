// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import {RxStompConfig} from '@stomp/rx-stomp';

export const environment = {
  production: false,
  baseApiUrl: 'http://localhost:8080',
  rxStompConfig: {
    brokerURL: 'ws://localhost:8080/ws',
    heartbeatIncoming: 0,
    heartbeatOutgoing: 20000,
    reconnectDelay: 500,
    debug: (msg: string): void => {
      console.log(new Date(), msg);
    }
  } as RxStompConfig,
  tinyApiKey: 'uti498f61h6qun3wwsh4lyxd1zmjnuh3nh9edgwma6ktdsks'
};
