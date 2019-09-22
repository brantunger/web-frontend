import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-shout-box',
  templateUrl: './shout-box.component.html',
  styleUrls: ['./shout-box.component.scss']
})
export class ShoutBoxComponent implements OnInit {
  formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.formGroup = this.formBuilder.group(
      {
        messageInput: ''
      }
    );
  }

  send() {
  }
}
