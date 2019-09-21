import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shout-box',
  templateUrl: './shout-box.component.html',
  styleUrls: ['./shout-box.component.scss']
})
export class ShoutBoxComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  send() {
    console.log('Send function');
  }
}
