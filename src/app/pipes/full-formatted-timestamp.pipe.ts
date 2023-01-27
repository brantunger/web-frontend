import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'fullFormattedTimestamp'})
export class FullFormattedTimestampPipe implements PipeTransform {
  dateTimeFormat: Intl.DateTimeFormatOptions = {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: 'numeric'
  };

  locale = 'en-us';

  transform(value: Date | undefined): string {
    value = value === undefined ? new Date() : value;
    const unformattedDateTime = new Date(value);
    return Intl.DateTimeFormat(this.locale, this.dateTimeFormat).format(unformattedDateTime);
  }
}
