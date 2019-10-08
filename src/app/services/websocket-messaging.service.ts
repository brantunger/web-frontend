import { StompService, StompConfig, StompState } from '@stomp/ng2-stompjs';
import { Message } from '@stomp/stompjs';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { AuthorizationService } from './authorization.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WebsocketMessagingService {
  private messages: Observable<Message>;
  private stompService: StompService;

  constructor(
    streamUrl: string,
    private authorizationService: AuthorizationService) {

    const stompConfig: StompConfig = {
      url: environment.baseSocketUrl,
      headers: {
        Authorization: `Bearer ${this.authorizationService.getAccessToken()}`
      },
      heartbeat_in: 0,
      heartbeat_out: 20000,
      reconnect_delay: 5000,
      debug: true
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
