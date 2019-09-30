import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface AlertServiceOptions {
  viewLabel: string;
  message: string;
  type: AlertType;
}

export enum AlertType {
  Success = 'success',
  Error = 'error',
  Clear = 'clear'
}

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  alert$ = new Subject<AlertServiceOptions>();
  currentAlerts: { [key: string]: AlertServiceOptions } = {};

  constructor() {}

  clear = (viewLabel: string) => {
    delete this.currentAlerts[viewLabel];
    this.alert$.next({ viewLabel, message: '', type: AlertType.Clear });
  }

  clearAll = () => {
    this.currentAlerts = {};
  }

  updateAlert(viewLabel: string, message: string, type: AlertType): void {
    this.pushAlert({ viewLabel, message, type });
  }

  updateApiAlert(viewLabel: string, response: any): void {
    const alertType = response.success ? AlertType.Success : AlertType.Error;
    this.pushAlert({ viewLabel, message: response.message, type: alertType });
  }

  success(viewLabel: string, message: string): void {
    this.updateAlert(viewLabel, message, AlertType.Success);
  }

  error(viewLabel: string, message: string): void {
    this.updateAlert(viewLabel, message, AlertType.Error);
    if ( message.toLowerCase().startsWith('insufficient privileges') ) {
      setTimeout(() => {
        this.clear(viewLabel);
      }, 5000);
    }
  }

  private pushAlert = (options: AlertServiceOptions): void => {
    this.currentAlerts[options.viewLabel] = options;
    this.alert$.next(options);
  }
}
