import { AfterViewChecked, ChangeDetectorRef, Component, OnInit } from '@angular/core';
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
export class ShoutBoxComponent implements OnInit, AfterViewChecked {
  formGroup!: FormGroup;
  messages = [];

  constructor(
    public authorizationService: AuthorizationService,
    private websocketMessagingService: WebsocketMessagingService,
    private webServiceApi: WebApiService,
    private formBuilder: FormBuilder,
    private cdr: ChangeDetectorRef) { }

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
            this.messages.push(`${message.username}: ${message.message}` as never));
      }, error => console.error(error.error.message));

    this.websocketMessagingService.watch(TOPIC_URL)
      .subscribe((message: Message) => {
        const jsonMessage = JSON.parse(message.body);
        this.messages.push(jsonMessage.content as never);
      });
  }

  ngAfterViewChecked(): void {
    this.cdr.detectChanges();
  }

  send(): void {
    const message = this.formGroup.controls['messageInput'].value;
    const body = {
      name: this.authorizationService.getUsername(),
      message: `${message}`
    };
    const bodyString = JSON.stringify(body);

    if (message !== '') {
      this.formGroup.controls['messageInput'].setValue('');
      this.websocketMessagingService.publish({
        destination: SEND_URL, body: bodyString
      });
    }
  }
}
