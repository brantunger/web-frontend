import { Injectable } from '@angular/core';
import { StompConfig, StompService, StompState } from '@stomp/ng2-stompjs';
import { Message } from '@stomp/stompjs';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


// TODO: Upgrade to RxStomp
@Injectable({
  providedIn: 'root'
})
export class WebsocketMessagingService {
  private messages: Observable<Message>;
  private stompService: StompService;

  constructor(streamUrl: string) {

    const stompConfig: StompConfig = {
      url: environment.baseSocketUrl,
      headers: {
        Authorization: 'No Authentication'
      },
      heartbeat_in: 0,
      heartbeat_out: 20000,
      reconnect_delay: 5000,
      debug: false
    };

    this.stompService = new StompService(stompConfig);
    this.messages = this.stompService.subscribe(streamUrl);
  }

  public stream(): Observable<Message> {
    return this.messages;
  }

  public send(url: string, message: any) {
    return this.stompService.publish(url, JSON.stringify(message));
  }

  public state(): BehaviorSubject<StompState> {
    return this.stompService.state;
  }
}
