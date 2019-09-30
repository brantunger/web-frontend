import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import {
  AlertService,
  AlertServiceOptions,
  AlertType
} from '../services/alert.service';
import { filter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-alert-banner',
  templateUrl: './alert-banner.component.html',
  styleUrls: ['./alert-banner.component.scss']
})
export class AlertBannerComponent implements OnInit, OnDestroy {
  // TODO: cancelling a message as it disappears due to timeout can
  //  cause the trigger for expand/collapse to break, making it stay
  //  expanded despite no banner.

  unsubscribe$ = new Subject();
  message: string = '';
  type: AlertType;
  @Input() viewLabel: string;

  constructor(private alertService: AlertService) {}

  ngOnInit() {
    const currentAlert = this.alertService.currentAlerts[this.viewLabel];
    if (currentAlert) {
      this.updateDisplay(currentAlert);
    }

    this.alertService.alert$
      .pipe(
        takeUntil(this.unsubscribe$),
        filter(options => options.viewLabel === this.viewLabel)
      )
      .subscribe(this.updateDisplay);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  updateDisplay = (options: AlertServiceOptions) => {
    this.message = options.message;
    if (options.type !== AlertType.Clear) {
      this.type = options.type;
      if (options.type === AlertType.Success) {
        setTimeout(this.clearThisAlert, 5000);
      }
    }
  }

  getTypeClass = (): string => {
    return this.type.toString();
  }

  getIcon = (): string => {
    switch (this.type) {
      case AlertType.Success:
        return 'check_circle';
      default: // display error icon by default (fall through)
      case AlertType.Error:
        return 'error';
    }
  }

  clearThisAlert = (): void => {
    this.alertService.clear(this.viewLabel);
  }
}
