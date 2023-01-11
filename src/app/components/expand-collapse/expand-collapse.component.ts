import {animate, style, transition, trigger} from '@angular/animations';
import {Component, ElementRef, HostBinding, Input, OnChanges, OnInit} from '@angular/core';

const propRequired = (component: any, propName: string) => {
  if (component[propName] === undefined || component[propName] === null) {
    console.error(
      `Attribute '${propName}' is required in component '${
        component.constructor.name
      }'`
    );
  }
};

@Component({
  selector: 'app-expand-collapse',
  template: `
    <ng-content></ng-content>
  `,
  styles: [
    `
      :host {
        display: block;
        overflow: hidden;
      }
    `
  ],
  animations: [
    trigger('grow', [
      transition('void <=> *', []),
      transition(
        '* <=> *',
        [style({height: '{{startHeight}}px'}), animate('{{duration}}s ease')],
        {params: {startHeight: 0}}
      )
    ])
  ]
})
export class ExpandCollapseComponent implements OnChanges, OnInit {
  @Input()
  durationSeconds = 0.3;

  // When trigger's value changes, animation is triggered
  @Input()
  trigger: any;

  startHeight!: number;

  constructor(private element: ElementRef) {
  }

  ngOnInit(): void {
    propRequired(this, 'trigger');
  }

  @HostBinding('@grow') get grow() {
    return {
      value: this.trigger,
      params: {startHeight: this.startHeight, duration: this.durationSeconds}
    };
  }

  setStartHeight(): void {
    this.startHeight = this.element.nativeElement.clientHeight;
  }

  ngOnChanges(): void {
    this.setStartHeight();
  }
}
