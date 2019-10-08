import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Message } from '@stomp/stompjs';
import { AuthorizationService } from '../services/authorization.service';
import { WebsocketMessagingService } from '../services/websocket-messaging.service';

const TOPIC_URL = '/topic/shoutmessage';

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
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.formGroup = this.formBuilder.group(
      {
        messageInput: ''
      }
    );

    this.websocketMessagingService = new WebsocketMessagingService(
      TOPIC_URL,
      this.authorizationService
    );

    this.websocketMessagingService
      .stream()
      .subscribe((message: Message) => {
        const jsonMessage = JSON.parse(message.body);
        this.messages.push(jsonMessage.content);
      });
  }

  send() {
    const message = this.formGroup.controls.messageInput.value;
    this.formGroup.controls.messageInput.setValue('');
    this.websocketMessagingService.send('/shout', {
      name: this.authorizationService.getUsername(),
      message: `${message}`
    });
  }
}
