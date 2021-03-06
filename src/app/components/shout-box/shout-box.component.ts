import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Message } from '@stomp/stompjs';
import { AuthorizationService } from '../../services/authorization.service';
import { WebsocketMessagingService } from '../../services/websocket-messaging.service';
import { WebApiService } from '../../services/web-api.service';
import { take } from 'rxjs/operators';

const TOPIC_URL = '/topic/shoutmessage';
const SEND_URL = '/shout';

@Component({
  selector: 'app-shout-box',
  templateUrl: './shout-box.component.html',
  styleUrls: ['./shout-box.component.scss']
})
export class ShoutBoxComponent implements OnInit {
  formGroup: FormGroup;
  messages = [];
  websocketMessagingService: WebsocketMessagingService;

  constructor(
    public authorizationService: AuthorizationService,
    private webServiceApi: WebApiService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group(
      {
        messageInput: ''
      }
    );

    this.webServiceApi.getShoutMessages()
      .pipe(take(1))
      .subscribe(shoutMessages => {
        shoutMessages
          .forEach(message =>
            this.messages.push(`${message.username}: ${message.message}`));
      }, error => console.error(error.error.message));

    this.websocketMessagingService = new WebsocketMessagingService(TOPIC_URL);

    this.websocketMessagingService
      .stream()
      .subscribe((message: Message) => {
        const jsonMessage = JSON.parse(message.body);
        this.messages.push(jsonMessage.content);
      });
  }

  send(): void {
    const message = this.formGroup.controls.messageInput.value;
    if (message !== '') {
      this.formGroup.controls.messageInput.setValue('');
      this.websocketMessagingService.send(SEND_URL, {
        name: this.authorizationService.getUsername(),
        message: `${message}`
      });
    }
  }
}
