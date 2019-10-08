import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuthorizationService } from '../services/authorization.service';

@Component({
  selector: 'app-shout-box',
  templateUrl: './shout-box.component.html',
  styleUrls: ['./shout-box.component.scss']
})
export class ShoutBoxComponent implements OnInit {
  formGroup: FormGroup;
  messages = [
    'I wondered why the baseball was getting bigger. Then it hit me.',
    'Police were called to a day care, where a three-year-old was resisting a rest.',
    'Did you hear about the guy whose whole left side was cut off? He’s all right now.',
    'The roundest knight at King Arthur’s round table was Sir Cumference.',
    'To write with a broken pencil is pointless.',
    'When fish are in schools they sometimes take debate.',
    'The short fortune teller who escaped from prison was a small medium at large.',
    'A thief who stole a calendar… got twelve months.',
    'A thief fell and broke his leg in wet cement. He became a hardened criminal.',
    'Thieves who steal corn from a garden could be charged with stalking.',
    'When the smog lifts in Los Angeles , U. C. L. A.',
    'The math professor went crazy with the blackboard. He did a number on it.',
    'The professor discovered that his theory of earthquakes was on shaky ground.',
    'The dead batteries were given out free of charge.',
    'If you take a laptop computer for a run you could jog your memory.',
    'A dentist and a manicurist fought tooth and nail.',
    'A bicycle can’t stand alone; it is two tired.',
    'A will is a dead giveaway.',
    'Time flies like an arrow; fruit flies like a banana.',
    'A backward poet writes inverse.',
    'In a democracy it’s your vote that counts; in feudalism, it’s your Count that votes.',
    'A chicken crossing the road: poultry in motion.',
    'If you don’t pay your exorcist you can get repossessed.',
    'With her marriage she got a new name and a dress.',
    'Show me a piano falling down a mine shaft and I’ll show you A-flat miner.',
    'When a clock is hungry it goes back four seconds.',
    'The guy who fell onto an upholstery machine was fully recovered.',
    'A grenade fell onto a kitchen floor in France and resulted in Linoleum Blownapart.',
    'You are stuck with your debt if you can’t budge it.',
    'Local Area Network in Australia : The LAN down under.',
    'He broke into song because he couldn’t find the key.',
    'A calendar’s days are numbered.',
  ];

  constructor(
    public authorizationService: AuthorizationService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.formGroup = this.formBuilder.group(
      {
        messageInput: ''
      }
    );
  }

  send() {
    const message = this.formGroup.controls.messageInput.value;
    this.messages.push(`${this.authorizationService.getUsername()}: ${message}`);
  }
}
